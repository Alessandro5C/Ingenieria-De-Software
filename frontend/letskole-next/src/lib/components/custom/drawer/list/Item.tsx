import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

interface Props {
  children?: React.ReactNode;
  disableDivider?: boolean;
  /** @default true */
}

function CustomDrawerListItem({ children, disableDivider }: Props) {

  return (
    <>
      <ListItem
        disablePadding
        sx={(theme) => ({
          mt: "3px",
          mb: "3px",
          "& .MuiListItemButton-root": {
            "&.Mui-selected": {
              outline: "1px solid",
              outlineColor: theme.palette.primary.main
            }
          }
        })}
      >
        {children}
      </ListItem>
      {disableDivider ? null : <Divider variant="middle"/>}
    </>
  );
}

export default CustomDrawerListItem;
