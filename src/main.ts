import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "@Store/react-redux/store";
import { createRedux } from "@Store/react-redux/plugin";
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("awesome-button", AwesomeButton)
  .use(createRedux(store))
  .use(router)
  .mount("#app");
