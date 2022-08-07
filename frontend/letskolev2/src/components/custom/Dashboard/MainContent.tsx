import Box from '@mui/material/Box';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface Props {
  children?: React.ReactNode;
}

export default function MainContent({ children }: Props) {
  return(
    <Box
      component="main"
      sx={{
        backgroundColor:(theme) => 
        theme.palette.mode==='light'
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
        flexGrow:1,
        height:'100vh',
        overflow:'auto',
      }}>
      <Toolbar/>
      <Container maxWidth="md" sx={{mt:4,mb:4}}>
        {children}
      </Container>
    </Box>
  );
} 