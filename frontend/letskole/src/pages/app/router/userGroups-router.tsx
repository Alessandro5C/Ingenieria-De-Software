import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import CustomersList from "../../customers/customers-list";
import GroupsList from "../../groups/groups-list";
import UsersGroupForm from "../../userGroups/userGroups-form";
import UserGroupsList from "../../userGroups/userGroups-list";

function UserGroupsRouter() {
    return (
        <React.Fragment>
            <Route exact path="/UserGroups/list/:id" component={UserGroupsList} />
            <Route exact path="/customers/add" component={CustomerForm} />
            <Route exact path="/UserGroups/edit/:id/:userid" component={UsersGroupForm} />
            <Route exact path="/customers/detail/:id" component={CustomersDetails} />
        </React.Fragment>
    );
}

export default UserGroupsRouter;

