import React, { useReducer } from 'react';
import logo from './logo.svg';
import SignIn from './pages/SignInPage';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRouter from './router/auth-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from './i18next/i18n.constants';
import { Dashboard } from './components/custom/Dashboard/Dashboard';
import UserProvider from './context/User/userprovider';
import { userReducer } from './context/User/userreducer';
import { initialUserState } from './context/User/userstate';
import UserContext from './context/User/usercontext';
import UserRouter from './router/user-router';
import UserCover from './components/UserCover';
import ThemeCover from './components/ThemeCover';

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
  // const { i18n } = useTranslation(namespaces.pages.signin);
  // const changeLanguage = (language: string) => {
  //   i18n.changeLanguage(language);
  // }


  return (
    // Alessandro: Tu Layout es como el App
    // <ThemeProvider theme={theme}>
    <ThemeCover>
      <CssBaseline />

      {/* Important for React-router-dom */}
      <BrowserRouter>
        <Switch>
          {/* <UserContext.Provider value={{state, dispatch}}> */}
          {/* <UserCover> */}
            <Dashboard> {/* changeLanguage={changeLanguage} */}
              <UserRouter />
              <AuthRouter />
            </Dashboard>
          {/* </UserCover> */}
          {/* </UserContext.Provider> */}
        </Switch>
      </BrowserRouter>

    </ThemeCover>
    // </ThemeProvider>
  );
}

export default App;
