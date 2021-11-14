import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import CustomersList from "../../customers/customers-list";
import GroupsList from "../../groups/groups-list";
import RewardList from "../../rewards/rewards-list";

function RewardRouter() {
    return (
        <React.Fragment>
            <Route exact path="/logros/list/:id" component={RewardList} />

        </React.Fragment>
    );
}

export default RewardRouter;
