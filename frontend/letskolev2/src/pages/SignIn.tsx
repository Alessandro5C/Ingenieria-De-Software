import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { FormEvent } from 'react';
import { Copyright } from '@mui/icons-material';


export default function SingIn() {
  const handleSubmit = (event:FormEvent<HTMLFormElement>)=>{}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:1 }}>
            <TextField 
            margin="normal"
            required 
            fullWidth 
            id ="email" 
            label="Email Address"
            name="email"
            autoComplete="email" 
            autoFocus/>
           <TextField 
            margin="normal"
            required 
            fullWidth 
            id ="password" 
            label="password"
            name="password"
            autoComplete="current-password" 
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
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
      </Box>
        <Copyright sx={{ mt:8, mb:4}}/>
    </Container>
  );
}
