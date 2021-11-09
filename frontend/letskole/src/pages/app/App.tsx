import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import themeMui from "../../themes/theme-mui";
import Dashboard from "../../components/dashboard/dashboard";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import CustomersRouter from "./router/customers-router";
import DashboardRouter from "./router/dashboard-router";

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={themeMui}>
        <Switch>
          <Dashboard>
            <CustomersRouter />
            <DashboardRouter />
          </Dashboard>
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
