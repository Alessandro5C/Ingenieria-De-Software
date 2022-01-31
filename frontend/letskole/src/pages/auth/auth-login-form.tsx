import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomBody from "../../components/body-custom/custom-body";
import CustomBodyDescription from "../../components/body-custom/custom-body-description";
import CustomBodyName from "../../components/body-custom/custom-body-name";
import CustomTextField from "../../components/custom-text-field/custom-text-field";
import CustomMainForm from "../../components/form/custom-main-form";

import {Link, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {ApplicationUserLogin} from "../../models/auth/application-user-login";
import authService from "../../api/auth/auth.service";

function AuthLoginForm() {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [userLogin, setUserLogin] = useState<ApplicationUserLogin>(new ApplicationUserLogin());


  const { path, url } = useRouteMatch();
  const which = (path=="/register"); // true: REGISTER, false: LOGIN

  function changeValueUserLogin(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const { value, name } = event.target;
    setUserLogin({ ...userLogin, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (which) {
      // REGISTER
      authService.register(userLogin).then(() => {
        history.push(`/register/${userLogin.email}`);
        // setMessage("Se agrego correctamento el cliente");
      });
    } else {
      // LOGIN
      authService.login(userLogin).then((data) => {
        data.userId ? history.push(`/users/detail/${data.userId}`) :
            history.push(`/register/${data.email}`);
        // setMessage("Se agrego correctamento el cliente");
      });
    }
  }

  function updatedLoading() {
    setLoading(false);
    setOpen(true);
  }

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <CustomBody>
        <CustomMainForm
          title={which ? "Registrese para poder iniciar sesión" : "Inicie sesión para comenzar"}
        >
          <form onSubmit={handleSubmit}>
            <React.Fragment>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12}>
                  <CustomTextField
                    value={userLogin.email}
                    onChange={(event) => changeValueUserLogin(event)}
                    required
                    name="email"
                    label="Correo Electrónico"
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <CustomTextField
                    value={userLogin.password}
                    onChange={(event) => changeValueUserLogin(event)}
                    required
                    name="password"
                    label="Contraseña"
                    type="password"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginTop: "15px"}} >
                <Grid item xs={12} sm={6}>
                  { !which && (
                      <Button
                      hidden={true}
                      component={Link}
                      to={`/register`}
                      variant="contained"
                      color={"secondary"}
                      startIcon={<span className="material-icons">Send</span>}
                      disabled={loading}
                      >
                        No tengo cuenta
                      </Button>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} style={
                  { display: "flex", justifyContent: "flex-end"}}>
                  <Button
                      type={"submit"}
                      variant="contained"
                      color={"primary"}
                      startIcon={<span className="material-icons">send</span>}
                      disabled={loading}
                  >
                    {which ? "Registrarme" : "Iniciar sesión"}
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          </form>
        </CustomMainForm>
      </CustomBody>
    </React.Fragment>
  );
}

export default AuthLoginForm;
