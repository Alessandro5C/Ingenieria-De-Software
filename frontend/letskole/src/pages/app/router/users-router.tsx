import React from "react";
import { Route } from "react-router-dom";
import CustomersDetails from "../../customers/customers-details";
import UsersList from "../../users/users-list";
import UsersForm from "../../users/users-form";


function UsersRouter() {
    return (
        <React.Fragment>
            <Route exact path="/users/list" component={UsersList} />
            <Route exact path="/users/add" component={UsersForm} />
            <Route exact path="/users/edit/:id" component={UsersForm} />
            <Route exact path="/users/detail/:id" component={CustomersDetails} />
        </React.Fragment>
    );
}

export default UsersRouter;
