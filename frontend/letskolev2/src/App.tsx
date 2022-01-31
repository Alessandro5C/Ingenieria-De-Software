import React from 'react';
import logo from './logo.svg';
import SignIn from './pages/SignIn';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: "#f5c239",
    },
    secondary: {
      main: "#639d2f",
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SignIn />
      
    </ThemeProvider>
  );
}

export default App;
