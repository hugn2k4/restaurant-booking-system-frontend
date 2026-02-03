import type { AlertColor, SxProps, Theme } from "@mui/material";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import type { SlideProps } from "@mui/material/Slide";
import Slide from "@mui/material/Slide";
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

export interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose: (_event?: React.SyntheticEvent | Event, reason?: string) => void;
  // new: stack index (0 = top most). Used to offset stacked snackbars vertically.
  stackIndex?: number;
  // optional sx to customize styling
  sx?: SxProps<Theme>;
  // i18n support
  translationKey?: string;
  namespace?: string;
}

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

const AppSnackbar: React.FC<AppSnackbarProps> = ({
  open,
  message,
  severity = "info",
  autoHideDuration = 3000,
  onClose,
  stackIndex = 0,
  sx,
  translationKey,
  namespace = "common",
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { t } = useTranslation(namespace as any);

  // Use translation if key is provided, otherwise use message directly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayMessage = translationKey ? (t(translationKey as any) as string) : message;

  // vertical offset per stacked snackbar (tweak as needed)
  const offset = stackIndex * 84; // 72px per item + 12px gap

  const mergedSx = [
    {
      "& .MuiPaper-root": {
        marginTop: `${offset}px`,
      },
    },
    sx,
  ];

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={SlideTransition}
      sx={mergedSx as SxProps<Theme>}
    >
      <Alert onClose={onClose} variant="filled" severity={severity} sx={{ width: "100%" }}>
        <AlertTitle>{severity.toUpperCase()}</AlertTitle>
        {displayMessage}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
