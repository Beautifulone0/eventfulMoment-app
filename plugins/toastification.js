import { defineNuxtPlugin } from "#app";
// import Toast from "vue-toastification";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/css/toast-styles.css"// Import custom styles

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    // Default options
    position: POSITION.TOP_RIGHT,
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false,
    // Custom classes
    toastClassName: 'custom-toast',
    bodyClassName: 'custom-toast-body',
  };
  nuxtApp.vueApp.use(Toast, options);
});
