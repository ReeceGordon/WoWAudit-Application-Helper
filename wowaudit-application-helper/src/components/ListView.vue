<template>
    <p style="color: red;" v-if="getAppsErrorFlag">Error getting applications, check api key is correct.</p>
    <div class="button-container"
        :class="{'jc-center' : applications.length > 0, 'jc-sb:' : applications.length === 0}">
        <button v-if="apiKey.isKeySet" class="flex-item btn btn-primary" @click="UpdateApplicationStore">Get
            Applications</button>
        <button v-if="apiKey.isKeySet === false" class="flex-item btn btn-primary" disabled>Get Applications</button>

        <button v-if="applications.length > 0" class="status-button flex-item btn"
            :class="{ 'btn-secondary': statusType === 'submitted', 'btn-success': statusType === 'accepted', 'btn-danger': statusType === 'rejected', 'btn-warning': statusType === 'under_review', 'btn-dark': statusType === 'all'}"
            @click="CycleStatusType">{{statusString}}</button>

        <button v-if="applications.length > 0" class="flex-item btn btn-warning"
            @click="toggleDispalyedApplication">Date
            Filter</button>
    </div>
    <div>
        <p v-if="filterFlag" class="flex text-danger">Only displaying applications that are 90+ days old</p>
    </div>


    <table v-if="applications.length > 0" class="table">
        <thead class="table-dark">
            <tr>
                <th scope="col">#AppId</th>
                <th scope="col">Discord</th>
                <th scope="col">Applied at</th>
                <th scope="col">Status</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="app in displayedApplications" :key="app.id">
                <th scope="row">{{app.id}}</th>
                <td>{{app.discord_id}}</td>
                <td>{{app.applied_at.toDateString()}}</td>
                <td>{{app.status}}</td>
                <td><button class="btn btn-danger" @click="delApplication(app.id)">Delete</button></td>
            </tr>
        </tbody>
    </table>


</template>

<script setup lang="ts">
import { getApplications, deleteApplication, type Application } from '../composables/useApplicationsApi'
import { useApiKeyStore } from '../stores/apiKey'
import { useApplicationStore } from '../stores/applications'
import { storeToRefs } from 'pinia';
import { ref, watchEffect, type App } from 'vue'

const apiKey = useApiKeyStore();
const appStore = useApplicationStore();
const { applications, filteredApplications } = storeToRefs(appStore);
const displayedApplications = ref<Application[]>([]);

const getAppsErrorFlag = ref(false);

const UpdateApplicationStore = async () => {
    const appList = await getApplications(apiKey.apiKey)
    if (appList !== undefined) {
        getAppsErrorFlag.value = false;

        // Update date strings to Date objects
        applications.value = appList.map(app => {
            const date = new Date(app.applied_at);
            app.applied_at = date;
            return app;
        })

        // Generate filtered applications
        filteredApplications.value = filterBy90Days(applications.value);

        // Default displayed applications to display all
        displayedApplications.value = applications.value;
    } else {
        getAppsErrorFlag.value = true;
    }
}

const filterBy90Days = (apps: Application[]) => {
    const today = new Date();

    const todayMinusThreeMonth = new Date();
    todayMinusThreeMonth.setDate(today.getDate() - 90);

    let newApps: Application[] = [];
    for (const app of apps) {
        if (app.applied_at < todayMinusThreeMonth) {
            newApps.push(app);
        }
    }

    return newApps;
}


const statusType = ref('all')
const statusString = ref("All")

let statusCount = 0;
const CycleStatusType = () => {
    if (statusCount === 0) {
        statusType.value = 'under_review'
        statusString.value = "Under Review"
        statusCount = 1;
        return;
    }
    if (statusCount === 1) {
        statusType.value = 'accepted'
        statusString.value = "Accepted"
        statusCount = 2;
        return;
    }
    if (statusCount === 2) {
        statusType.value = 'rejected'
        statusString.value = "Rejected"
        statusCount = 3;
        return;
    }
    if (statusCount === 3) {
        statusType.value = 'submitted'
        statusString.value = "Submitted"
        statusCount = 4;
        return;
    }
    if (statusCount === 4) {
        statusType.value = 'all'
        statusString.value = "All"
        statusCount = 0;
        return;
    }
}

const filterFlag = ref(false);
const toggleDispalyedApplication = () => {
    filterFlag.value = !filterFlag.value

    if (filterFlag.value === true) {
        displayedApplications.value = filteredApplications.value;
    } else {
        displayedApplications.value = applications.value;
    }
}


const delApplication = (appId: number) => {
    deleteApplication(apiKey.apiKey, appId);
    displayedApplications.value.splice(displayedApplications.value.findIndex(app => app.id == appId), 1)
}

watchEffect(() => {
    if (statusType.value === 'under_review') {
        let baseApps = [...applications.value]

        if (filterFlag.value === true) {
            baseApps = filterBy90Days(baseApps);
        }

        let filteredApps: Application[] = [];
        for (const app of baseApps) {
            if (app.status === 'under_review') {
                filteredApps.push(app);
            }
        }

        displayedApplications.value = filteredApps;
    }
    if (statusType.value === 'accepted') {
        let baseApps = [...applications.value]

        if (filterFlag.value === true) {
            baseApps = filterBy90Days(baseApps);
        }

        let filteredApps: Application[] = [];
        for (const app of baseApps) {
            if (app.status === 'accepted') {
                filteredApps.push(app);
            }
        }

        displayedApplications.value = filteredApps;
    }
    if (statusType.value === 'rejected') {
        let baseApps = [...applications.value]

        if (filterFlag.value === true) {
            baseApps = filterBy90Days(baseApps);
        }

        let filteredApps: Application[] = [];
        for (const app of baseApps) {
            if (app.status === 'rejected') {
                filteredApps.push(app);
            }
        }

        displayedApplications.value = filteredApps;
    }
    if (statusType.value === 'submitted') {
        let baseApps = [...applications.value]

        if (filterFlag.value === true) {
            baseApps = filterBy90Days(baseApps);
        }

        let filteredApps: Application[] = [];
        for (const app of baseApps) {
            if (app.status === 'submitted') {
                filteredApps.push(app);
            }
        }

        displayedApplications.value = filteredApps;
    }
    if (statusType.value === 'all') {
        let baseApps = [...applications.value]

        if (filterFlag.value === true) {
            baseApps = filterBy90Days(baseApps);
        }

        displayedApplications.value = baseApps;
    }
})

</script>

<style scoped>
.button-container {
    display: flex;
    flex-direction: row;
    margin-top: 5%;
    margin-bottom: 5%;
    justify-content: space-between;
}

.flex {
    display: flex;
    justify-content: center;
    margin: 0;
}

.status-button {
    min-width: 130px;
}
</style>