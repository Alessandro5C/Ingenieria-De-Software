import React from "react";
import { Route } from "react-router-dom";
import CustomerForm from "../../customers/customer-form";
import CustomersDetails from "../../customers/customers-details";
import CustomersList from "../../customers/customers-list";
import GamesList from "../../games/games-list";
import MathGame from "../../games/games-math";

function GamesRouter() {
    return (
        <React.Fragment>
            <Route exact path="/games/list" component={GamesList} />
            <Route exact path="/games/math" component={MathGame} />        
            <Route exact path="/customers/add" component={CustomerForm} />
            <Route exact path="/customers/edit/:id" component={CustomerForm} />
            <Route exact path="/customers/detail/:id" component={CustomersDetails} />
        </React.Fragment>
    );
}

export default GamesRouter;
