import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp/SignUp';

function AuthRouter() {
  return (
      <React.Fragment>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signup/:email" component={SignUp} />
          <Route exact path="/" component={SignIn} />
      </React.Fragment>
  );
}

export default AuthRouter;
