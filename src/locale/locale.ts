import enUS from "@Assets/en-US.json";
import fiFI from "@Assets/fi-FI.json";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en: enUS,
    fi: fiFI,
  },
});