import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CustomDrawerContentWrapper from "./ContentWrapper";
import content, { show } from "./Content";

interface Props {
  open: boolean;
  toggleOpen: () => void;
  logged: boolean;
}

function CustomDrawer({ logged, ...props }: Props) {

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={props.open}
      onClose={props.toggleOpen}
    >
      <Toolbar variant="dense"/>

      <List disablePadding>
        {Object.values(content).map((item, i) => {
          if (item.render === show.always ? true : item.render === show.logged ?
            logged : item.render === show.notLogged ? !logged : false)
            return (
              <ListItem key={i}>
                <CustomDrawerContentWrapper title={item.title}>
                  {item.component}
                </CustomDrawerContentWrapper>
              </ListItem>
            );
        })}
      </List>

    </Drawer>
  );
}

export default CustomDrawer;
