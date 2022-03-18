import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SignForm from "@/components/forms/SignForm";
import { useTranslation } from "next-i18next";
import AuthHandlerContext from "@/contexts/AuthHandler";
import apiUser from "@/api/user";
import UserResponse from "../../lib/responses/User";
import CustomButtonSubmitForm from "@/components/custom/button/SubmitForm";
import CustomTextField from "@/components/custom/TextField";

const roles: { [key: string]: string } = {
  "Student": "common:txt-roleStudent",
  "Teacher": "common:txt-roleTeacher"
};

export default function Profile() {
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation(["common", "profile"]);

  const [user, setUser] = React.useState<UserResponse>({});
  const [auxUser, setAuxUser] = React.useState<UserResponse>(user);
  const [loading, setLoading] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function handleFetch() {
      try {
        setLoading(true);
        const data = await apiUser
          .GetItemById(ctx.headers, ctx.content.id);

        if (data?.status === "success") {
          const localUser = data.data ?? {};
          setUser(localUser);
          setAuxUser(localUser);
        }
      } finally {
        setLoading(false);
      }
    }

    handleFetch();
  }, [ctx]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const data = await apiUser.Put(ctx.headers, auxUser);

      if (data?.status === "success") {
        setUser(auxUser);
        setEditing(false);
      } else {
        console.log("Something went wrong");
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignForm>

      <Typography component="h2" variant="h3">
        {t("profile:ttl-profile").toUpperCase()}
      </Typography>
      <Typography component="h2" variant="overline" color="text.disabled">
        {`ID: ${user?.id}`}
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              error={error}
              variant="outlined"
              editable={editing}
              customId="displayedName"
              obj={{ get: auxUser, set: setAuxUser }}
              label={t("common:txt-name")}
              autoComplete="name"
            />
            <Typography component="h2" variant="body1" color="text.disabled">
              {`${t("common:txt-email")}: ${user?.email}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              error={error}
              variant="outlined"
              editable={editing}
              customId="phoneNumber"
              obj={{ get: auxUser, set: setAuxUser }}
              label={t("common:txt-phone")}
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              error={error}
              variant="outlined"
              editable={editing}
              customId="birthday"
              obj={{ get: auxUser, set: setAuxUser }}
              label={t("common:txt-birthday")}
              autoComplete="bday"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              error={error}
              variant="outlined"
              editable={editing}
              customId="school"
              obj={{ get: auxUser, set: setAuxUser }}
              label={t("common:txt-school")}
            />
            {/*<Typography component="h2" variant="body1" color="text.disabled">*/}
            {/*  {`${t("common:txt-role")}: ${t(roles[user?.role ?? "Student"])}`}*/}
            {/*</Typography>*/}
          </Grid>
        </Grid>


        {editing && (
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Grid item>
              <Button
                color="info"
                type="reset"
                variant="contained"
                onClick={() => {
                  setAuxUser(user);
                  setEditing(false);
                }}
              >
                <b>{t("common:ui-cancel")}</b>
              </Button>
            </Grid>
            <Grid item>
              <CustomButtonSubmitForm loading={loading}>
                {t("common:ui-ok")}
              </CustomButtonSubmitForm>
            </Grid>
          </Grid>
        )}

        {!editing && (
          <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                color="secondary"
                type="button"
                fullWidth
                variant="contained"
                onClick={() => { setEditing(true); }}
              >
                <b>{t("common:ui-edit")}</b>
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </SignForm>
  );
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "profile"]))
      // Will be passed to the page component as props
    }
  };
}
