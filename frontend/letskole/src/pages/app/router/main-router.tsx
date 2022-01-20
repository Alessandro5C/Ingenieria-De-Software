import React from "react";
import { Route } from "react-router-dom";
import Dashboard from "../../../components/dashboard/dashboard";
import SignIn from "../SignIn";
import SingUp from "../Singup";


function MainRouter() {
    return (
        <React.Fragment>
            <Route exact path="/iniciosesion" component={SignIn} />
            <Route exact path="/registrar" component={SingUp} />
            <Route exact path="/dashboard" component={Dashboard} />
        </React.Fragment>
    );
}

export default MainRouter;
