import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store, storeKey } from "./store/store";
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("awesome-button", AwesomeButton)
  .use(store, storeKey)
  .use(router)
  .mount("#app");
