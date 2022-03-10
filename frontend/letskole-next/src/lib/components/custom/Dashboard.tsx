import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CustomAppBar from "./AppBar";
import CustomDrawer from "./Drawer/Drawer";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface Props {
  children?: React.ReactNode;
}

const avatar = (
  <div>
    {/*<Avatar*/}
    {/*  // alt="Remy Sharp"*/}
    {/*  // src="/static/images/avatar/2.jpg"*/}
    {/*  sx={{*/}
    {/*    width: 35,*/}
    {/*    height: 35,*/}
    {/*    bgcolor: "secondary.main"*/}
    {/*  }}*/}
    {/*>*/}
    R
    {/*</Avatar>*/}
  </div>
);

const name = "R";
const withoutAuth = (<LockOutlinedIcon/>);

function CustomDashboard({ children }: Props) {
  const logged = false;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <CssBaseline/>
      <CustomAppBar
        openDrawer={open}
        toggleDrawer={toggleDrawer}
        avatarContent={logged ? name : null}
      />

      <CustomDrawer
        open={open}
        toggleDrawer={toggleDrawer}
      >
        {}
      </CustomDrawer>
      {children}
    </div>
  );
}

export default CustomDashboard;
