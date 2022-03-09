import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../models/user';
import apiUsers from '../api/api.user';
import { SignUp } from '../models/signup';
import authService from '../api/api.authservice';
import { useTranslation } from 'react-i18next';
import { namespaces } from '../i18next/i18n.constants';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHistory } from "react-router-dom";


interface Props {
  changeLanguage: (language: string) => void
}

const initSignUp : SignUp = {
  displayedName: '',
  email: '',
  password: '',
  role: ''
}

export default function SingUp(props: Props) { 
  const history = useHistory();
  const [signup, setSignUp] = useState(initSignUp);
  const inputEmail = useRef<HTMLInputElement>(null);
  const { t } = useTranslation(namespaces.pages.signup);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if(!signup.email.includes('@')){
      window.alert("Email must have '@'");
      return;
    }

    await authService.register(signup).then(
      (appUserResponse) => {
        if (appUserResponse && isUser(appUserResponse)){
          // Reviso su información
          window.alert('User registered correctly'); // This because token empty
          history.push('/');
        }
        else {
          inputEmail.current?.focus();
        }
    });
  }

  // Custom Type Guards
  function isUser(object: any): object is User {
    return 'displayedName' in object; 
  }
  

  function changeValueSignUp (event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setSignUp({...signup, [name]: value});
  }

  function handleStudent (value: string) {
    setSignUp({...signup, role: value});
  }

  return (
    <Container component="main" maxWidth="xs" >
      <button onClick={() => props.changeLanguage("en")}>English</button>
      <button onClick={() => props.changeLanguage("es")}>Español</button>
      <Box
        sx = {{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h2" variant="h4" m={2} >
          {t('signup')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={t('name')}
                name="displayedName"
                autoComplete="Name"
                value={signup.displayedName}
                onChange={changeValueSignUp}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="email"
                name="email"
                required
                fullWidth
                label={t('email')}
                autoFocus
                value={signup.email}
                onChange={changeValueSignUp}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label={t('password')}
                name="password"
                autoComplete="password"
                type="password"
                value={signup.password}
                onChange={changeValueSignUp}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>{t('iam')}</Typography>
              <FormControlLabel control={<Checkbox checked={signup.role === "student"} onChange={() => handleStudent('student')} />} label={t('student').toString()} />
              <FormControlLabel control={<Checkbox checked={signup.role === "teacher"} onChange={() => handleStudent('teacher')} />} label={t('teacher').toString()} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2 }}
          >
             {t('register')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                {t('signin')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    
    </Container>
    
  );
}
