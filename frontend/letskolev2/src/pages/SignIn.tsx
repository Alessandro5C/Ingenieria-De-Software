import { Avatar, 
  Box, 
  Button, 
  Checkbox, 
  Container, 
  FormControlLabel, 
  Grid, 
  Link, 
  TextField, 
  ThemeProvider, 
  Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { MouseEvent, useContext, useRef, useState } from 'react';
import { Copyright } from '@mui/icons-material';
import { LoginContext } from '../context/context';
import { addUserLogin } from '../context/reducer';
import { ApplicationUserLogin } from '../models/aplication-user-login';
import authService from '../api/api.authservice';
import { useHistory } from "react-router-dom";
import apiUsers from '../api/api.user';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../i18next/i18n.constants';
import request  from '../api/api';

const initApplicationUserLogin : ApplicationUserLogin = {
  email: '',
  password: ''
}

interface Props {
  changeLanguage: (language: string) => void
}

export default function SingIn(props: Props) {
  const history = useHistory();
  const [ userLogin, setUserLogin ] = useState<ApplicationUserLogin>(initApplicationUserLogin);
  const inputEmail = useRef<HTMLInputElement>(null);
  const { t } = useTranslation(namespaces.pages.signin);

  React.useEffect(() => {
    const token = window.localStorage.getItem('token');
    
    if(token){
      history.push('/dashboard');
    } 
  }, []);

  function changeValueUserLogin(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ){
    const { value, name } = event.target;
    setUserLogin({...userLogin, [name]: value});
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if(!userLogin.email.includes('@')){
      window.alert("Email must have '@'");
      return;
    }

    await authService.login(userLogin).then(
      (appUserResponse) => {
        if (appUserResponse){
          // Reviso su información
          inputEmail.current?.focus();
          if (appUserResponse.token){
            window.localStorage.setItem('token', appUserResponse.token);
            history.push('/dashboard');
          } else{
            window.alert('User not registered'); // This because token empty
          }
        }
        else {
          window.alert('Unexpected error ocurred');
          inputEmail.current?.focus();
        }
    });
  }

  return (
    <React.Fragment>
    <button onClick={() => props.changeLanguage("en")}>English</button>
    <button onClick={() => props.changeLanguage("es")}>Español</button>
      
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit}>
      <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <Avatar sx={{ width: 50, height: 50, m:4, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h4">
            {t('signin')}
          </Typography>
          <Box sx={{ mt:1 }}>
            <TextField 
            margin="normal"
            required 
            fullWidth 
            label={t('email')}
            name="email"
            autoComplete="email" 
            value={userLogin.email}
            onChange={(event) => changeValueUserLogin(event)}
            autoFocus
            inputRef={inputEmail}
            />
           <TextField 
            margin="normal"
            required 
            fullWidth 
            label={t("password")}
            name="password"
            type="password"
            autoComplete="current-password" 
            value={userLogin.password}
            onChange={(event) => changeValueUserLogin(event)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label={t("rememberme").toString()} /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2 }}
              >
                {t('signin')}
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  {t("forgotPassword")}
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {t("donthaveaccount")}
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Box>
      </form>
        <Copyright sx={{ mt:8, mb:4}}/>
    </Container>
    </React.Fragment>
  );
}
