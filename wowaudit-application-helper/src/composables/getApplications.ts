interface MainCharacter {
  name: string;
  realm: string;
  region: string;
  class: string;
  race: string;
  faction: string;
  level: number;
}

interface Application {
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

function api<T>(url: string, header: Headers): Promise<T> {
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

export const getApplications = (apiKey: string) => {
  const tokenHeader = new Headers({
    authorization: apiKey,
  });

  api<Application[]>("/api/v1/applications", tokenHeader)
    .then((apps) => {
      console.log(apps);
    })
    .catch((error) => {
      /* show error message */
      console.log("error: " + error);
    });
};
