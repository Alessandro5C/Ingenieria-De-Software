import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard  } from '../components/custom/Dashboard/Dashboard';
import CardGame from '../pages/card-game/CardGame';
import GamesPage from '../pages/GamesPage';
import WelcomePage from '../pages/WelcomePage';


interface Props {
  changeLanguage?: (language: string) => void
}

function GamesRouter(props: Props) {
  return (
      <React.Fragment>
        <Route exact path="/games/card">
          <CardGame />    
        </Route>
      </React.Fragment>
  );
}

export default GamesRouter;