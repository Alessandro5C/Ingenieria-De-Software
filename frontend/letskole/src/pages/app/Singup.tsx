import { Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import React from 'react';
import logo from '../../assets/images/logo.png';


const useStyles = makeStyles((theme)=> ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  
}));

const SingUp = () => {
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar alt="Logo Letskole" src={logo} className={classes.avatar}/>
          <Typography component="h1" variant="h5">
          Registrate
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo Electronico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
            ¿Ya tienes una cuenta? 
              <Link href="#" variant="body2">
                Ingresa Aqui
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>

      </Container>
  );
};

export default SingUp;
