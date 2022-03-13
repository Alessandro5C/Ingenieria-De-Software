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
import React, { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { Copyright } from '@mui/icons-material';
import authService from '../api/api.authservice';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { namespaces } from '../i18next/i18n.constants';
import { SignIn } from '../models/signin';
import { SignInResponse } from '../models/signin-response';
import { setHeaderToken } from '../api/api';
import { isUser } from './SignUpPage';
import UserContext from '../context/User/usercontext';
import { setId, setLogged } from '../context/User/userreducer';

const initSignIn : SignIn = {
  email: '',
  password: ''
}

interface Props {
  changeLanguage?: (language: string) => void
}

export default function SignInPage(props: Props) {
  const history = useHistory();
  const [ signin, setSignIn ] = useState<SignIn>(initSignIn);
  const inputEmail = useRef<HTMLInputElement>(null);
  const { t } = useTranslation(namespaces.pages.signin);
  const { dispatch } = React.useContext(UserContext);

  function changeValueSignIn(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ){
    const { value, name } = event.target;
    setSignIn({...signin, [name]: value});
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if(!signin.email.includes('@')){
      window.alert("Email must have '@'");
      return;
    }

    // call api login
    await authService.login(signin).then(
      (signinresponse) => {
        // check if it is signinresponse
        if (signinresponse && isSignInResponse(signinresponse)){
          
          // check if it is valid
          if (signinresponse.valid){
            window.localStorage.setItem('token', signinresponse.token); // save token on localstorage
            setHeaderToken(); // set header for axios
            dispatch(setId(signinresponse.id)); // set id (context)
            dispatch(setLogged(true)); // set logged (context)

            history.push(`/dashboard`);
            
            // ctx.setlogged.TRUE();
          } else{
            window.alert('User not registered'); // This because token empty
          }
        }
        else {
          inputEmail.current?.focus();
        }
    });
  }

  // Custom Type Guards
  function isSignInResponse(object: any): object is SignInResponse {
    return 'token' in object; 
  }

  return (
    <React.Fragment>
    {/* <button onClick={() => props.changeLanguage("en")}>English</button>
    <button onClick={() => props.changeLanguage("es")}>Español</button> */}
      
    <Container component="main" maxWidth="xs">
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
          <Box component="form" onSubmit={handleSubmit} sx={{ mt:1 }}>
            <TextField 
            margin="normal"
            required 
            fullWidth 
            label={t('email')}
            name="email"
            autoComplete="email" 
            value={signin.email}
            onChange={(event) => changeValueSignIn(event)}
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
            value={signin.password}
            onChange={(event) => changeValueSignIn(event)}
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
                  {t("forgotpassword")}
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
      <Copyright sx={{ mt:8, mb:4}}/>
    </Container>
    </React.Fragment>
  );
}
