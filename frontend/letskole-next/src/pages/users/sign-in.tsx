import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Link from "next/link";
import SignForm from "@/components/forms/SignForm";
import CustomButtonSubmitForm from "@/components/custom/button/SubmitForm";
import apiUser from "@/api/user";
import AuthHandlerContext from "@/contexts/AuthHandler";
import UserResponse from "@/models/User";

const headers = { "Content-type": "application/json" };

export default function SignIn() {
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation(["common", "sign-in"]);

  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password")
    };
    // eslint-disable-next-line no-console
    apiUser.SignIn(headers, userData)
      .finally(() => setLoading(false))
      .catch(data => console.log(data));

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password")
    // });
  };

  return (
    <SignForm>
      <Typography component="h1" variant="h5">
        {t("sign-in:ttl-signIn")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t("common:txt-email")}
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t("common:txt-password")}
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary"/>}
          // @ts-ignore
          label={t("sign-in:txt-rememberMe")}
        />
        <CustomButtonSubmitForm
          loading={loading} fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          {t("sign-in:btn-signIn")}
        </CustomButtonSubmitForm>
      </Box>
      <Grid container>
        <Grid item xs>
          <MuiLink href="#" variant="body2">
            {t("sign-in:txt-forgotPassword")}
          </MuiLink>
        </Grid>
        <Grid item>
          <Link href="/users/sign-up" passHref>
            <MuiLink variant="body2">
              {t("sign-in:txt-noAccount")}
            </MuiLink>
          </Link>
        </Grid>
      </Grid>
    </SignForm>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "sign-in"]))
      // Will be passed to the page component as props
    }
  };
}