import React from "react";
import { Route } from "react-router-dom";
import UserPage from "../pages/UserPage";

export default function UserRouter() {
    return (
        <React.Fragment>
            <Route exact path="/dashboard/user/details">
                <UserPage />
            </Route>
        </React.Fragment>
    );
}