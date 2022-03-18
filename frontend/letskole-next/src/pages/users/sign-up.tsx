import * as React from "react";
import TextField from "@mui/material/TextField";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignForm from "@/components/forms/SignForm";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import apiUser from "@/api/user";
import AuthHandlerContext from "@/contexts/AuthHandler";
import CustomButtonSubmitForm from "@/components/custom/button/SubmitForm";

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
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation(["common", "sign-up"]);
  const { push } = useRouter();

  // const [user, setUser] = React.useState<UserResponse | null>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(event.currentTarget);
      const data = await apiUser.SignUp(ctx.headers, {
        displayedName: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        role: formData.get("role") as string
      });

      if (data?.status === "success") {
        return await push("/users/sign-in");
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignForm>
      <Typography component="h1" variant="h5">
        {t("sign-up:ttl-signUp")}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              error={error}
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
              error={error}
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
              error={error}
              required
              id="password"
              name="password"
              label={t("common:txt-password")}
              fullWidth
              autoComplete="new-password"
              type="password"
              helperText={error && (t("sign-in:txt-noValid"))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error}
              required
              id="role"
              name="role"
              label={t("common:txt-role")}
              defaultValue="Student"
              fullWidth
              select
              helperText={error && (t("sign-in:txt-noValid"))}
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {t(option.label)}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <CustomButtonSubmitForm
          loading={loading}
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          {t("sign-up:btn-signUp")}
        </CustomButtonSubmitForm>

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
