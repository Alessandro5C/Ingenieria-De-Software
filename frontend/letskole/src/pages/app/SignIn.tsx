import { useState } from 'react';
import logo from '../../assets/images/logo.png';
import App from './App';
import { Container, 
  CssBaseline,
  Avatar,
  TextField, 
  Typography,
  Checkbox, 
  Button,
  FormControlLabel,
  Grid,
  Link,
  Box } 
  from '@material-ui/core';
import LOckIcon from '@material-ui/icons/Lock';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

const SignIn = () => {
  const classes = useStyles();
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar alt="Logo Letskole" src={logo} className={classes.avatar}/>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Ingresa tu correo electrónico"
            name="email"
            autoComplete='email'
            autoFocus 
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            name="password"
            label="Ingresa tu contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="recordame" color="primary" />}
            label="Recordar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}>
            Iniciar sesión
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Crear cuenta nueva
              </Link>
            </Grid>
            
          </Grid>

        </form>
      </div>
    </Container>  
  );
};

export default SignIn;
