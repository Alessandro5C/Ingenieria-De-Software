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
import AuthHandlerContext, { defaultContent } from "@/contexts/AuthHandler";

export default function SignIn() {
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation(["common", "sign-in"]);
  const { push } = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const data = await apiUser.SignIn(ctx.headers, {
        email: formData.get("email") as string,
        password: formData.get("password") as string
      });

      if (data?.status === "success") {
        const auth = data?.data ?? defaultContent;
        ctx.handle.login(false, auth);
        if (auth.valid) {
          console.log("Exitoso", auth);
          return await push("/users/profile");
        } else {
          console.log("Fallaste", auth)
          setError(true);
        }
      }
      else {
        console.log("Something went wrong")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignForm>
      <Typography component="h1" variant="h5">
        {t("sign-in:ttl-signIn")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          error={error}
          required
          id="email"
          name="email"
          label={t("common:txt-email")}
          fullWidth
          margin="normal"
          autoComplete="email"
          autoFocus
        />
        <TextField
          error={error}
          required
          id="password"
          name="password"
          label={t("common:txt-password")}
          fullWidth
          margin="normal"
          type="password"
          autoComplete="current-password"
          helperText={error && (t("sign-in:txt-noValid"))}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary"/>}
          // @ts-ignore
          label={t("sign-in:txt-rememberMe")}
        />
        <CustomButtonSubmitForm
          loading={loading}
          fullWidth
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