import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard  } from '../components/custom/Dashboard/Dashboard';
import GamesPage from '../pages/GamesPage';
import WelcomePage from '../pages/WelcomePage';


interface Props {
  changeLanguage?: (language: string) => void
}

function AuthRouter(props: Props) {
  return (
      <React.Fragment>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route exact path="/games">
          <GamesPage />    
        </Route>
      </React.Fragment>
  );
}

export default AuthRouter;
