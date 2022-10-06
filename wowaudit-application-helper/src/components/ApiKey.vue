<template>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">api key</span>
        </div>
        <input v-if="toggleInput" v-model="apiKey.apiKey" type="text" class="min-input form-control" id="basic-url"
            aria-describedby="basic-addon3">
        <input v-else="toggleInput" v-model="apiKey.apiKey" disabled type="text" class="min-input form-control"
            id="basic-url" aria-describedby="basic-addon3">
        <button class="flex-item btn btn-dark" @click="toggleInput = !toggleInput">Set Key</button>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useApiKeyStore } from '../stores/apiKey'

const apiKey = useApiKeyStore();
const toggleInput = ref(true);

watchEffect(() => {
    apiKey.isKeySet = !toggleInput.value;
})

</script>

<style scoped>
.input-group-prepend>span {
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0;
}

.min-input {
    min-width: 629px !important;
}
</style>