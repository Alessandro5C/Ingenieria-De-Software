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
            <Route exact path="/UserGroups/list/:groupid" component={UserGroupsList} />
            <Route exact path="/UserGroups/add/:groupid" component={UsersGroupForm} />
            <Route exact path="/UserGroups/edit/:groupid/:userid" component={UsersGroupForm} />
        </React.Fragment>
    );
}

export default UserGroupsRouter;

