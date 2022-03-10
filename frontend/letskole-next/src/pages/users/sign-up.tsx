import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignForm from "@/components/forms/SignForm";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { SelectChangeEvent } from "@mui/material/Select";
import { ChangeEvent } from "react";

const roles = [
  {
    value: "Student",
    label: "common:txt-roleStudent"
  },
  {
    value: "Teacher",
    label: "common:txt-roleTeacher"
  }
];

export default function SignUp() {
  const { locale, locales, defaultLocale } = useRouter();
  const { t } = useTranslation(["common", "sign-up"]);

  // const [role, setRole] = React.useState("Student");
  //
  // const handleSetRole = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //   setRole(event.target.value as string)
  // }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setRole(role);
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      role: data.get("role")
    });
  };

  return (
    <SignForm>

      <Typography component="h1" variant="h5">
        {t("sign-up:ttl-signUp")}
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label={t("common:txt-name")}
              fullWidth
              autoComplete="name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label={t("common:txt-email")}
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label={t("common:txt-password")}
              fullWidth
              autoComplete="new-password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="role"
              name="role"
              label={t("common:txt-role")}
              defaultValue="Student"
              // value={role}
              // onChange={handleSetRole}
              fullWidth
              select
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("sign-up:btn-signUp")}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/users/sign-in" passHref>
              <MuiLink variant="body2">
                {t("sign-up:txt-haveAccount")}
              </MuiLink>
            </Link>
          </Grid>
        </Grid>

      </Box>
    </SignForm>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "sign-up"]))
      // Will be passed to the page component as props
    }
  };
}
