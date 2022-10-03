<template>
    list view present
    <button @click="debug">Console.log</button>
</template>

<script setup lang="ts">
import { getApplications } from '../composables/getApplications'
import { useApiKeyStore } from '../stores/apiKey'

const apiKey = useApiKeyStore();

const debug = () => {
    getApplications(apiKey.apiKey)
}

</script>