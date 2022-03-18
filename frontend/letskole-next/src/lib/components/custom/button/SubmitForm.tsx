import * as React from "react";
import { useTranslation } from "next-i18next";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface Props extends ButtonProps {
  children?: React.ReactNode;
  loading: boolean;
}

function CustomButtonSubmitForm({ children, loading, ...props }: Props) {
  const { t } = useTranslation("common");

  if (!loading || props.disabled) {
    return (
      <Button type="submit" variant="contained" {...props}>
        <b>{children}</b>
      </Button>
    );
  }

  return (
    <Button
      sx={{ display: "flex", justifyContent: "center" }}
      disabled type="submit" variant="contained" {...props}
    >
      <b>{t("ui-loading")}</b>
      <CircularProgress
        disableShrink size={18} color="inherit" sx={{ ml: 1 }}/>
    </Button>
  );
}

export default CustomButtonSubmitForm;