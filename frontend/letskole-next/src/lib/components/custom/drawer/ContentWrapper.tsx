import * as React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

interface Props {
  children?: React.ReactNode;
  title: string | boolean;
}

function CustomDrawerContentWrapper({ title, children }: Props) {
  const { t } = useTranslation("common");

  function WhichDivider(title: string | boolean) {
    switch (title) {
      case false:
        return null;
      case true:
        return <Divider sx={{ mt: 1, mb: 1 }}/>;
      default:
        return (
          <Divider>
            <Typography
              component="p"
              variant="overline"
              color="text.disabled"
              textAlign="center"
            >
              {t(title)}
            </Typography>
          </Divider>
        );
    }
  }

  return (
    <Container maxWidth="xl" disableGutters>
      {WhichDivider(title)}

      {children}
    </Container>
  );
}

export default CustomDrawerContentWrapper;