import { Avatar, Box, Typography, Button, TextField, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useRef, useState } from 'react'
import { ApplicationUserLogin } from '../../models/aplication-user-login';
import authService from '../../api/api.authservice';
import { useHistory } from 'react-router-dom';

function Register(){
  const [ userLogin, setUserLogin ] = useState<ApplicationUserLogin>({
    email: '',
    password: ''
  });
  const history = useHistory();


  const inputEmail = useRef<HTMLInputElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    if(!userLogin.email.includes('@')){
      window.alert("Email must have '@'");
      return;
    }
    
    await authService.login(userLogin).then(
      async (appUserResponse) => {
        if(appUserResponse){ // 
          window.alert("It seems you already have an account try log in");
          return;
        }

        // await authService.register(userLogin)
        // .then(data => {
        //   if(data){
        //     window.alert("Primera parte finalizada");
        //     history.push(`/signup/${userLogin.email}`);
        //   } else{
        //     window.alert("Cannot register because there is duplicated " + 
        //     "email in the system or the password is too short, try setting" +
        //     "a new email or set a longer password or signin with your last account");
        //     inputEmail.current?.focus();
        //   }
        // });

    });


  }

  function changeValueUserLogin(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
    const { value, name } = event.target;
    setUserLogin({...userLogin, [name]: value});
  }

  return (
    <Box
      sx = {{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      <form onSubmit={handleSubmit} >
      <Avatar sx={{m: 1, bgcolor: 'secondary-main'}}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h2" variant="h4">
        Sign Up
      </Typography>
      <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="email"
            name="email"
            required
            fullWidth
            label="Email Address"
            autoFocus
            value={userLogin.email}
            onChange={(event) => changeValueUserLogin(event)}
            inputRef={inputEmail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Password"
            name="password"
            autoComplete="password"
            type="password"
            value={userLogin.password}
            onChange={(event) => changeValueUserLogin(event)}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2 }}
        >
          register
        </Button>
        <Grid>
          <Link href="/" variant="body2">
              Sign In (Login)
          </Link>
        </Grid>
      </Grid>
      </Box>
      </form>
    </Box>
  )
}

export default Register