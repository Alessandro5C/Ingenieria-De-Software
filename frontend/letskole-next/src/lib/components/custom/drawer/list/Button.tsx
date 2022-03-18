import * as React from "react";
import { LinkProps } from "next/link";
import CustomNextLink from "../../NextLink";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  children?: React.ReactNode;
  current: boolean;
  nextLinkProps: LinkProps;
  onClick: () => void;
}

function CustomDrawerListButton({ children, nextLinkProps, current, onClick }: Props) {
  return (
    <CustomNextLink {...nextLinkProps} disabled={current} passHref>
      <ListItemButton component="a" selected={current} onClick={onClick}>
        {children}
      </ListItemButton>
    </CustomNextLink>
  );
}

export default CustomDrawerListButton;
