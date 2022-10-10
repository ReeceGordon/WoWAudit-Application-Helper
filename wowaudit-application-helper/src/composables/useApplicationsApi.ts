interface MainCharacter {
  name: string;
  realm: string;
  region: string;
  class: string;
  race: string;
  faction: string;
  level: number;
}

export interface Application {
  id: number;
  applied_at: Date;
  status: string;
  role: string;
  age: number;
  country: string;
  battletag: string;
  discord_id: string;
  main_character: MainCharacter;
}

interface AppWrapper {
  applications: Application[];
}

const proxyServer: string = "https://safe-everglades-42447.herokuapp.com/";

async function api<T>(url: string, header: Headers): Promise<T> {
  return fetch(url, {
    method: "GET",
    headers: header,
    mode: "cors",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then((data) => data as T);
  });
}

export const getApplications = async (apiKey: string) => {
  const tokenHeader = new Headers({
    authorization: apiKey,
  });

  try {
    const apps = await api<AppWrapper>(
      proxyServer + "https://wowaudit.com/v1/applications",
      tokenHeader
    );
    return apps.applications;
  } catch (error) {
    console.log("error getting applications: " + error);
  }
};

export const deleteApplication = async (apiKey: string, appId: number) => {
  const tokenHeader = new Headers({
    authorization: apiKey,
  });

  try {
    await fetch(proxyServer + "https://wowaudit.com/v1/applications/" + appId, {
      method: "DELETE",
      headers: tokenHeader,
      mode: "cors",
    });
  } catch (error) {
    console.log("error deleting applications: " + error);
  }
};
