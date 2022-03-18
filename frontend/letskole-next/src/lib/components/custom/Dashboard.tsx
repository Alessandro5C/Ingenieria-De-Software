import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import CustomAppBar from "./AppBar";
import CustomDrawer from "./drawer/Drawer";
import AuthHandlerContext from "@/contexts/AuthHandler";

interface Props {
  children?: React.ReactNode;
}

function CustomDashboard({ children }: Props) {
  const ctx = React.useContext(AuthHandlerContext);
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => { setOpen(!open); };

  return (
    <div>
      <CssBaseline/>
      <CustomAppBar
        openDrawer={open}
        toggleDrawer={toggleOpen}
        logged={ctx.content.valid}
      />

      <CustomDrawer
        open={open}
        toggleOpen={toggleOpen}
        logged={ctx.content.valid}
      />

      {children}

    </div>
  );
}

export default CustomDashboard;
