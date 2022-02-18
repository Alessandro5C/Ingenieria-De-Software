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
import { useTranslation, Trans } from 'react-i18next';

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
  // const [state, dispatch] = useReducer(loginReducer, InitialLoginState);
  // const { t, i18n } = useTranslation();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <div>
        { Object.keys(lngs).map((lng) => (
          <button key={lng} style={{ fontWeight: i18n.resolvedLanguage == lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>      
            {lngs[lng].nativeName}
            </button>
        ))}
      </div> */}
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
