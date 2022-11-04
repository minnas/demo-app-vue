import { i18n } from "@Locale/locale";
import { computed } from "vue";

export const dummyOptions = computed(
  () =>
    <DummyOption[]>[
      { id: "option-1", label: i18n.global.t("option-1") },
      { id: "option-2", label: i18n.global.t("option-2") },
      { id: "option-3", label: i18n.global.t("option-3") },
    ]
);

export type DummyOption = {
  id?: string;
  label?: string;
};
