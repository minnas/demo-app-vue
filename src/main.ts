import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "@Store/react-redux/store";
import { createRedux } from "@Store/react-redux/plugin";
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { default as AwesomeButton } from "@Tools/AwesomeButton.vue";
import { ItemStoreProvider, PROVIDER_KEY } from "@Provider/provider";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("awesome-button", AwesomeButton)
  .use(createRedux(store))
  .use(router)
  .provide(PROVIDER_KEY, ItemStoreProvider)
  .mount("#app");
