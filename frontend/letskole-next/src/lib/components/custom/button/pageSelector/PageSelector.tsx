import * as React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useRouter } from "next/router";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import CustomDrawerListItem from "../../drawer/list/Item";
import CustomDrawerListButton from "../../drawer/list/Button";
import { useTranslation } from "next-i18next";
import content from "./Content";

function CustomButtonPageSelector() {
  const { t } = useTranslation("common");
  const { pathname } = useRouter();
  // const { locale, locales, pathname, asPath, query, ...router } = useRouter();
  // const { locale, locales } = useRouter();
  // React.useEffect(()=>{
  //
  // }, []) ;

  return (
    <List disablePadding>
      {content?.map((item, i) => {
        const current = item.href === pathname;

        return (
          <div key={i}>
            <CustomDrawerListItem>
              <CustomDrawerListButton
                current={current}
                nextLinkProps={{ href: item.href }}
                onClick={() => {}}
              >
                <ListItemIcon>
                  {item.icon(current)}
                </ListItemIcon>
                <ListItemText
                  primary={t(item.text)}
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

export default CustomButtonPageSelector;
