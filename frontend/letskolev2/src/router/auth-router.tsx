import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp/SignUp';

interface Props {
  changeLanguage: (language: string) => void
}

function AuthRouter(props: Props) {
  return (
      <React.Fragment>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/:email" component={SignUp} />
          <Route exact path="/dashboard">
            <Dashboard changeLanguage={props.changeLanguage}/>
          </Route> 
          <Route exact path="/">
            <SignIn changeLanguage={props.changeLanguage} />
          </Route>
      </React.Fragment>
  );
}

export default AuthRouter;
