import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  openDrawer: boolean;
  toggleDrawer: () => void;
  logged: boolean;
}

const btnStyle = { mr: 1 };
const btnMenuIcon = (<MenuIcon sx={btnStyle}/>);
const btnLeftIcon = (<ChevronRightIcon sx={btnStyle}/>);

function CustomAppBar(props: Props) {

  return (
    <AppBar
      // enableColorOnDark
      position="sticky"
      sx={{
        // color,
        zIndex: 1200 + 1,
        backgroundColor: (theme) => {
          if (theme.palette.mode === "light")
            return "#D8D8D8";
        }
      }}
    >
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {/*LOGO*/}
        <Box textAlign="center" sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div">
            Let Skole Logo
          </Typography>
        </Box>
        {/*LOGO*/}

        {/*SPACE OR DASHBOARD*/}
        <Box sx={{ flexGrow: 14, display: { xs: "none", md: "flex" } }}/>
        <Box sx={{ flexGrow: 6, display: { xs: "flex", md: "none" } }}/>
        {/*SPACE OR DASHBOARD*/}

        {/*RIGHT*/}
        <Box textAlign="center" sx={{ flexGrow: 1 }}>
          <Button
            // color="secondary"
            onClick={props.toggleDrawer}
            variant="outlined"
            sx={{
              width: 40,
              height: 35
            }}
          >
            <Avatar
              sx={{
                width: 35,
                height: 35,
                bgcolor: "primary.main"
              }}
            >
              {props.logged ? null : <LockOutlinedIcon/>}
            </Avatar>
            {props.openDrawer ? btnLeftIcon : btnMenuIcon}
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
