import { t } from "@Locale/locale";
import { computed } from "vue";

export const dummyOptions = computed(
  () =>
    <DummyOption[]>[
      { id: "option-1", label: t("option-1") },
      { id: "option-2", label: t("option-2") },
      { id: "option-3", label: t("option-3") },
    ]
);

export type DummyOption = {
  id?: string;
  label?: string;
};
