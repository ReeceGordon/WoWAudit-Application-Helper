import { ref } from "vue";
import { defineStore } from "pinia";

export const useApiKeyStore = defineStore("apiKey", () => {
  const apiKey = ref("");
  const isKeySet = ref(false);
  return { apiKey, isKeySet };
});
