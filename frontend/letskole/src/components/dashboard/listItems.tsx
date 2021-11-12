import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem
      button
      exact
      component={NavLink}
      to={"/"}
      activeClassName="Mui-selected"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="LetSkole" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Usuarios</ListSubheader>
      <ListItem
          button
          component={NavLink}
          //Agrega al router el "to"
          to={"/users/list"}
          activeClassName="Mui-selected"
      >
          <ListItemIcon>
              <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Mostrar usuarios" />
      </ListItem>

    <ListItem
      button
      component={NavLink}
      to={"/customers/list"}
      activeClassName="Mui-selected"
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Mostrar clientes" />
    </ListItem>

    
    <ListItem
      button
      component={NavLink}
      to={"/v1/User/GetAllByFilter"}
      activeClassName="Mui-selected"
    >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Agregar Clientes" />
    </ListItem>

    <ListSubheader inset>Grupos</ListSubheader>
      <ListItem
          button
          component={NavLink}
          to={"/groups/list"}
          activeClassName="Mui-selected"
      >
          <ListItemIcon>
              <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Mostrar grupos" />
      </ListItem>

      
    <ListSubheader inset>Actividades</ListSubheader>
    <ListItem
      button
      component={NavLink}
      to={"/activities/list"}
      activeClassName="Miu-selected">
      
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
        <ListItemText primary="Mostrar actividades" />
    </ListItem>
  </div>
);
