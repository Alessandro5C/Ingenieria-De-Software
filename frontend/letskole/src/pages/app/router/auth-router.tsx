import React from "react";
import { Route } from "react-router-dom";
import CustomersDetails from "../../customers/customers-details";
import UsersList from "../../users/users-list";
import UsersForm from "../../users/users-form";
import AuthLoginForm from "../../auth/auth-login-form";
import UsersDetails from "../../users/users-details";


function AuthRouter() {
    return (
        <React.Fragment>
            <Route exact path="/" component={AuthLoginForm} />
            <Route exact path="/register" component={AuthLoginForm} />
            <Route exact path="/register/:email" component={UsersForm} />
            <Route exact path="/users/detail/:id" component={UsersDetails} />
        </React.Fragment>
    );
}

export default AuthRouter;
