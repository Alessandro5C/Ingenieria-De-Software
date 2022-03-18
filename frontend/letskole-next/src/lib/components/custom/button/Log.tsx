import * as React from "react";
import { useTranslation } from "next-i18next";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CustomDrawerListItem from "../drawer/list/Item";
import CustomDrawerListButton from "../drawer/list/Button";
import AuthHandlerContext from "@/contexts/AuthHandler";

interface Props {
  logged: boolean;
}

const btnColor = "primary";
const btnLoginIcon = (<LoginOutlinedIcon color={btnColor}/>);
const btnLogoutIcon = (<LogoutOutlinedIcon color={btnColor}/>);

function CustomButtonLog({ logged }: Props) {
  const ctx = React.useContext(AuthHandlerContext);
  const { t } = useTranslation("common");

  return (
    <List disablePadding>
      <CustomDrawerListItem disableDivider>
        <CustomDrawerListButton
          current={false}
          nextLinkProps={{ href: "/users/sign-in" }}
          onClick={() => { ctx.handle.logout(); }}
        >
          <ListItemIcon>
            {!logged ? btnLoginIcon : btnLogoutIcon}
          </ListItemIcon>
          <ListItemText
            primary={t(!logged ?
              "common:drawer:btn-login":
              "common:drawer:btn-logout"
            )}
            // sx={current ? { color: "primary.main" } : {}}
          />
        </CustomDrawerListButton>
      </CustomDrawerListItem>
    </List>
  );
}

export default CustomButtonLog;
