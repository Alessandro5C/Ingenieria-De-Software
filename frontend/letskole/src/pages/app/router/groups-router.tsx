import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import CustomersList from "../../customers/customers-list";
import GroupsList from "../../groups/groups-list";

function GroupsRouter() {
    return (
        <React.Fragment>
            <Route exact path="/groups/list" component={GroupsList} />
            <Route exact path="/customers/add" component={CustomerForm} />
            <Route exact path="/customers/edit/:id" component={CustomerForm} />
            <Route exact path="/customers/detail/:id" component={CustomersDetails} />
        </React.Fragment>
    );
}

export default GroupsRouter;
