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
import React, { MouseEvent, useContext, useState } from 'react';
import { Copyright } from '@mui/icons-material';
import { LoginContext } from '../context/context';
import { addUserLogin } from '../context/reducer';
import { ApplicationUserLogin } from '../models/aplication-user-login';
import authService from '../api/api.authservice';
import { useHistory } from "react-router-dom";
import apiUsers from '../api/api.user';

const initApplicationUserLogin : ApplicationUserLogin = {
  email: '',
  password: ''
}

export default function SingIn() {
  const history = useHistory();
  const [ userLogin, setUserLogin ] = useState<ApplicationUserLogin>(initApplicationUserLogin);

  function changeValueUserLogin(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ){
    const { value, name } = event.target;
    setUserLogin({...userLogin, [name]: value});
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(userLogin.email);
    console.log(userLogin.password);
   
    if(!userLogin.email.includes('@')){
      window.alert("Email must have '@'");
      return;
    }

    // const data : FormData = new FormData(event.currentTarget);
    // const email : FormDataEntryValue | null = data.get('email');
    // const password : FormDataEntryValue | null = data.get('password');

    await authService.login(userLogin).then(async (data) => {
      if(data){ // si retorna usuario

        await apiUsers.detail(data.userId.toString()).then((user) => {
          if(user && user.id && user.name && user.numTelf && user.email && user.birthday && user.school){  // si existe user completo
            history.push(`/dashboard/${data.userId}`);
          }
          else{
            history.push('/signup');
          }
        });// llamar al detalle usuario
      } 
      else{
        window.alert("User not registered");
      }
      
    });

  }
  return (
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
            Sign In
          </Typography>
          <Box sx={{ mt:1 }}>
            <TextField 
            margin="normal"
            required 
            fullWidth 
            label="Email Address"
            name="email"
            autoComplete="email" 
            autoFocus
            value={userLogin.email}
            onChange={(event) => changeValueUserLogin(event)}
            />
           <TextField 
            margin="normal"
            required 
            fullWidth 
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password" 
            value={userLogin.password}
            onChange={(event) => changeValueUserLogin(event)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label = "remember me"/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2 }}
              >
                Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Box>
      </form>
        <Copyright sx={{ mt:8, mb:4}}/>
    </Container>
  );
}
