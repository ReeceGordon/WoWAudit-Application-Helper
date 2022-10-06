import { ref } from "vue";
import { defineStore } from "pinia";
import type { Application } from "../composables/useApplicationsApi";

export const useApplicationStore = defineStore("applications", () => {
  const applications = ref<Application[]>([]);
  const filteredApplications = ref<Application[]>([]);
  return { applications, filteredApplications };
});
