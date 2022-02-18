import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../models/user';
import apiUsers from '../../api/api.user';
import { ApplicationUserLogin } from '../../models/aplication-user-login';
import authService from '../../api/api.authservice';
import Register from './Register';
import Detail from './Detail';

export default function SingUp() { 
  const inputEmail = useRef<HTMLInputElement>(null);
  const { email } = useParams<{ email: string }>();
   
  return (
    <React.Fragment>
      <Grid container component="main" 
        sx={{ 
        height: '100vh',
        alignItems: 'space-around',
        }}
      >
        <Grid 
          item
          xs={12}
          sm={8}
          md={4}
        >
         { !email && <Register />}
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
        >
          { email && <Detail email={email} /> }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
