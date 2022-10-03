<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">api key</span>
        </div>
        <input v-if="toggleInput" v-model="apiKey.apiKey" type="text" class="form-control" id="basic-url"
            aria-describedby="basic-addon3">
        <input v-else="toggleInput" v-model="apiKey.apiKey" disabled type="text" class="form-control" id="basic-url"
            aria-describedby="basic-addon3">
        <button class="flex-item btn btn-dark" @click="toggleInput = !toggleInput">Set Key</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useApiKeyStore } from '../stores/apiKey'

const apiKey = useApiKeyStore();
const toggleInput = ref(true);

</script>

<style scoped>
.input-group-prepend>span {
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0;
}

.form-control {
    min-width: 500px;
}
</style>