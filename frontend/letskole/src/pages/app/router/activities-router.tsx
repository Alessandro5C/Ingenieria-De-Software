import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import ActivityDetails from "../../activities/activity-details";

import CustomersList from "../../customers/customers-list";
import UsersList from "../../users/users-list";
import ActivitiesList from "../../activities/activities-list";
import ActivityForm from "../../activities/activity-form";


function UsersRouter() {
    return (
        <React.Fragment>
            <Route exact path="/activities/list" component={ActivitiesList} />
            <Route exact path="/activities/add" component={ActivityForm} />
            <Route exact path="/activities/edit/:id" component={ActivityForm} />
            <Route exact path="/activities/detail/:id" component={ActivityDetails} />
        </React.Fragment>
    );
}

export default UsersRouter;
