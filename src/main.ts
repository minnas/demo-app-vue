import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "@Store/react-redux/store";
import { createRedux } from "@Store/react-redux/plugin";
import { router } from "./router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import AwesomeButton from "@Tools/AwesomeButton.vue";
import LocaleSwitch from "@Tools/LocaleSwitch.vue";
import ThemeSwitch from "@Tools/ThemeSwitch.vue";

import {
  ItemStoreProvider,
  ITEM_PROVIDER_KEY,
  ThemeProvider,
  THEME_PROVIDER_KEY,
} from "@Provider/provider";
import { i18n } from "@Locale/locale";

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("awesome-button", AwesomeButton)
  .component("locale-switch", LocaleSwitch)
  .component("theme-switch", ThemeSwitch)
  .use(createRedux(store))
  .use(router)
  .use(i18n)
  .provide(ITEM_PROVIDER_KEY, ItemStoreProvider)
  .provide(THEME_PROVIDER_KEY, ThemeProvider)
  .mount("#app");
