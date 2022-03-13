import React, { useReducer } from 'react';
import logo from './logo.svg';
import SignIn from './pages/SignInPage';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRouter from './router/auth-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from './i18next/i18n.constants';
import { Dashboard } from './pages/Dashboard/Dashboard';
import UserProvider from './context/User/userprovider';
import { userReducer } from './context/User/userreducer';
import { initialUserState } from './context/User/userstate';
import UserContext from './context/User/usercontext';
import UserRouter from './router/user-router';

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
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <UserContext.Provider value={{state, dispatch}}>
            <Dashboard changeLanguage={changeLanguage}>
              <UserRouter />
              <AuthRouter />
            </Dashboard>
          </UserContext.Provider>
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
