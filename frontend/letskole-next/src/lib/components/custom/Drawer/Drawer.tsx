import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { languagesOptions, mainListItems, secondaryListItems, visualizationOptions } from "./listItems";
import CustomButtonThemeMode from "../button/ThemeMode";

interface Props {
  children?: React.ReactNode;
  open: boolean;
  toggleDrawer: () => void;
}

function CustomDrawer(props : Props) {

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={props.open}
      onClose={props.toggleDrawer}
      sx={{
        display: "flex",
        // alignItems: "center",
        // justifyContent: "flex-end"
      }}
    >
      <Toolbar variant="dense"/>

      {props.children}
      <Divider/>
      {/*<ThemeModeButton/>*/}
      <List>{visualizationOptions}</List>
      <Divider/>
      <List disablePadding>{languagesOptions}</List>
      <Divider/>
      <List>{mainListItems}</List>
      <Divider/>
      <List>{secondaryListItems}</List>

    </Drawer>
  );
}

export default CustomDrawer;
