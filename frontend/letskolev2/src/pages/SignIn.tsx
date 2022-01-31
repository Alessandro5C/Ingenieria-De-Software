import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';


export default function SingIn() {
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
          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt:1 }}>
            
          </Box> */}
      </Box>
    </Container>
  );
}
