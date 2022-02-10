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
  // const [state, dispatch] = useReducer(loginReducer, InitialLoginState);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
