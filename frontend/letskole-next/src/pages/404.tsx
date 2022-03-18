import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CustomFooter from "@/components/custom/Footer";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

export default function Custom404() {
  const { t } = useTranslation("common");

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "85vh",
        overflow: "auto",
        backgroundColor: (theme) => {
          if (theme.palette.mode === "light")
            return "#EDEDED";
        }
      }}
    >
      <Grid item>
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {/*<Box*/}
            {/*  sx={{*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column",*/}
            {/*    alignItems: "center",*/}
            {/*    // height: "20%"*/}
            {/*  }}*/}
            {/*>*/}
              <Typography component="p" variant="h2">
                <b>404</b>
              </Typography>
              <Typography component="p" variant="h5">
                {t("common:pages:txt-404")}
              </Typography>
            {/*</Box>*/}
            <CustomFooter/>
          </Box>
        </Container>
      </Grid>

    </Grid>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"]))
      // Will be passed to the page component as props
    }
  };
}
