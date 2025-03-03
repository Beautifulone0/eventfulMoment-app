import { defineNuxtPlugin } from "#app";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/assets/css/toast-styles.css"; // Import custom styles

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    // Default options
    
    // Custom classes
    toastClassName: 'custom-toast',
    bodyClassName: 'custom-toast-body',
  };

  nuxtApp.vueApp.use(Toast, options);
});