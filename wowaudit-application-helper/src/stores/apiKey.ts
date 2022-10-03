import { ref } from "vue";
import { defineStore } from "pinia";

export const useApiKeyStore = defineStore("apiKey", () => {
  const apiKey = ref("");
  return { apiKey };
});
