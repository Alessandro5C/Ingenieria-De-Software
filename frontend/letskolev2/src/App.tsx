import React, { useReducer } from 'react';
import logo from './logo.svg';
import SignIn from './pages/SignIn';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRouter from './router/auth-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from './i18next/i18n.constants';
import Dashboard from './pages/Dashboard/Dashboard';
const theme = createTheme({
  palette: {
    primary: {
      main: "#f5c239",
    },
    secondary: {
      main: "#639d2f",
    },
  },
  spacing: 5

});

function App() {
  const { i18n } = useTranslation(namespaces.pages.signin);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <AuthRouter changeLanguage={changeLanguage}/>
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
