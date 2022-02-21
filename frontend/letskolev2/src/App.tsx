import React, { useReducer } from 'react';
import logo from './logo.svg';
import SignIn from './pages/SignIn';
import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { loginReducer } from './context/reducer';
import { InitialLoginState } from './context/state';
import { LoginContext } from './context/context';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRouter from './router/auth-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from './i18next/i18n.constants';

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
// const lngs = {
//   "en": { nativeName: 'English' },
//   "de": { nativeName: 'Deutsch' }
// };
function App() {
  const { i18n } = useTranslation(namespaces.pages.signin);
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("es")}>Español</button>


      {/* <LoginContext.Provider value = {{ state, dispatch}}> */}
      <BrowserRouter>
        <Switch>
          <AuthRouter />
        </Switch>
      </BrowserRouter>
      
      {/* </LoginContext.Provider> */}
      </ThemeProvider>
  );
}

export default App;
