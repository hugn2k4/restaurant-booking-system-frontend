import { useCallback, useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  // Helper để dễ dùng với i18n
  const showSnackbarI18n = useCallback(
    (translationKey: string, severity?: "success" | "error" | "info" | "warning", namespace = "common") => {
      return context.showSnackbar("", severity, 3000, translationKey, namespace);
    },
    [context]
  );

  return {
    ...context,
    showSnackbarI18n,
  };
};
