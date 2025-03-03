import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/assets/css/toast-styles.css"; // Optional custom styles

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: "top-right",
    timeout: 3000,
    toastClassName: "custom-toast",
    bodyClassName: "custom-toast-body",
  });

  nuxtApp.provide("toast", () => import("vue-toastification").then(m => m.useToast()));
});