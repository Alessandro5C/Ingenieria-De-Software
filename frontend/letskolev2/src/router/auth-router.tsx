import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard  } from '../components/custom/Dashboard/Dashboard';
import SignInPage from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import UserRouter from './user-router';
import WelcomePage1  from '../pages/WelcomePage';
import UserPage from '../pages/UserPage';
import WelcomePage from '../pages/WelcomePage';


interface Props {
  changeLanguage?: (language: string) => void
}

function AuthRouter(props: Props) {
  return (
      <React.Fragment>
          <Route exact path="/signup">
            <SignUpPage changeLanguage={props.changeLanguage} />
          </Route>
          <Route exact path="/dashboard">
            <WelcomePage />
          </Route>
          <Route exact path="/">
            <SignInPage changeLanguage={props.changeLanguage} />
          </Route>
      </React.Fragment>
  );
}

export default AuthRouter;
