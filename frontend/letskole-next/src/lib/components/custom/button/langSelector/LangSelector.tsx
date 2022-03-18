import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
// import { ListItemButton, ListItemText } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/router";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import List from "@mui/material/List";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import CustomNextLink from "../../NextLink";
import CustomDrawerListItem from "../../drawer/list/Item";
import CustomDrawerListButton from "../../drawer/list/Button";
import content from "./Content";

function CustomButtonLangSelector() {
  // const { locale, locales, pathname, asPath, query, ...router } = useRouter();
  const { locale, locales } = useRouter();

  return (
    <List disablePadding>
      {locales?.map((item, i) => {
        const current = item === locale;

        return (
          <div key={i}>
            <CustomDrawerListItem>
              <CustomDrawerListButton
                current={current}
                nextLinkProps={{ href: "", locale: item }}
                onClick={() => {document.cookie = `NEXT_LOCALE=${item}`;}}
              >
                {current && (
                  <ListItemIcon>
                    <CheckIcon color="primary"/>
                  </ListItemIcon>
                )}
                <ListItemText
                  inset={!current}
                  primary={content[item]}
                  sx={current ? { color: "primary.main" } : {}}
                />
              </CustomDrawerListButton>
            </CustomDrawerListItem>
          </div>
        );
      })}
    </List>
  );
}

export default CustomButtonLangSelector;
