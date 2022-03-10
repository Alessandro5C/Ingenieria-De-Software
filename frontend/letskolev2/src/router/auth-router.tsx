import React from 'react';
import { Route } from 'react-router-dom';
import { Dashboard  } from '../pages/Dashboard/Dashboard';
import SignInPage from '../pages/SignIn';
import { SignUpPage } from '../pages/SignUp';
import { Welcome } from '../pages/Welcome';

interface Props {
  changeLanguage: (language: string) => void
}

function AuthRouter(props: Props) {
  return (
      <React.Fragment>
          <Route exact path="/signup">
            <SignUpPage changeLanguage={props.changeLanguage} />
          </Route>
          <Route exact path="/dashboard">
            <SignInPage changeLanguage={props.changeLanguage} />
          </Route>
          <Route exact path="/dashboard/:id">
            <Dashboard changeLanguage={props.changeLanguage}>
              <Welcome />
            </Dashboard>
          </Route> 
          <Route exact path="/">
            <SignInPage changeLanguage={props.changeLanguage} />
          </Route>
      </React.Fragment>
  );
}

export default AuthRouter;
