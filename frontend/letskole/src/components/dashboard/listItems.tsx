import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { NavLink } from "react-router-dom";
import { ApplicationUserResponse } from "../../models/auth/application-user-response";

const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
  JSON.parse(localStorage.getItem('appUserData')));
  
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
      {<ListItem
          button
          component={NavLink}
          to={"/groups/create"}
          activeClassName="Mui-selected"
      >
          <ListItemIcon>
              <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar grupos" />
      </ListItem>}

    <ListSubheader inset>Juegos</ListSubheader>
      <ListItem
          button
          component={NavLink}
          to={"/games/list"}
          activeClassName="Mui-selected"
      >
          <ListItemIcon>
              <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Mostrar juegos" />
      </ListItem>

      
    <ListSubheader inset>Actividades</ListSubheader>
    <ListItem
      button
      component={NavLink}
      to={`/activities/list/${appUserData.userId}`}
      activeClassName="Miu-selected">
      
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
        <ListItemText primary="Mostrar actividades" />
    </ListItem>

    <ListItem
      button
      component={NavLink}
      to={"/activities/add"}
      activeClassName="Miu-selected">
      
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
        <ListItemText primary="Agregar actividades" />
    </ListItem>

    <ListSubheader inset>Logros</ListSubheader>
    <ListItem
      button
      component={NavLink}
      to={`/logros/list/${appUserData.userId}`}
      activeClassName="Miu-selected">
      
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
        <ListItemText primary="Mostrar Logros" />
    </ListItem>
    
  </div>
);
