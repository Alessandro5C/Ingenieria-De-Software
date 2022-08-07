import './App.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthRouter from './router/auth-router';
import { useTranslation } from 'react-i18next';
import { namespaces } from './i18next/i18n.constants';
import { Dashboard } from './components/custom/Dashboard/Dashboard';
import ThemeCover from './components/ThemeCover';
import GamesRouter from './router/games-router';

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
    <ThemeCover>
      <CssBaseline />

      {/* Important for React-router-dom */}
      <BrowserRouter>
        <Switch>
            <Dashboard> {/* changeLanguage={changeLanguage} */}
              <AuthRouter />
              <GamesRouter />
            </Dashboard>
        </Switch>
      </BrowserRouter>
    </ThemeCover>
  );
}

export default App;
