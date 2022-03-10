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
        <Container maxWidth="lg" sx={{mt:4,mb:4}}>
          <Grid container spacing={3}>
            {/* poner las partes aca. */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p:2, 
                  display: 'flex',
                  flexDirection:'column',
                  height:240,
                }}>
                  {children}
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </Box>
  );
} 