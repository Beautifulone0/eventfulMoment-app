import { defineNuxtPlugin } from "#app";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./assets/css/toast-styles.css"; // Import custom styles

const { POSITION } = Toast; // Extract POSITION from default import

export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    position: POSITION.TOP_RIGHT, // Use POSITION safely
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
    toastClassName: "custom-toast",
    bodyClassName: "custom-toast-body",
  };

  nuxtApp.vueApp.use(Toast, options);
});
