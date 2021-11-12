import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import CustomersList from "../../customers/customers-list";
import UsersList from "../../users/users-list";

function UsersRouter() {
    return (
        <React.Fragment>
            <Route exact path="/users/list" component={UsersList} />
            <Route exact path="/customers/add" component={CustomerForm} />
            <Route exact path="/customers/edit/:id" component={CustomerForm} />
            <Route exact path="/customers/detail/:id" component={CustomersDetails} />
        </React.Fragment>
    );
}

export default UsersRouter;
