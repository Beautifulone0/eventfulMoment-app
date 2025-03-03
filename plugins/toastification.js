import { defineNuxtPlugin } from "#app";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/assets/css/toast-styles.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: "top-right",
    timeout: 3000,
    toastClassName: "custom-toast",
    bodyClassName: "custom-toast-body",
  });

  const toast = useToast(); // ✅ Properly initialize toast

  nuxtApp.provide("toast", toast); // ✅ Provide it globally
});

