import * as React from "react";
import { useTranslation } from "next-i18next";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
// import CustomDrawerListItem from "../drawer/list/Item";
// import CustomDrawerListButton from "../drawer/list/Button";
import AuthHandlerContext from "@/contexts/AuthHandler";
import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps{
  cellValue: "X" | "O" | null;
}

// const btnStyle = { width: "100%", height: "100%" };
// const btnStyle = { width: "100%", height: "100%", fontSize: 24 };

function GamesTicTacToeSquare({ cellValue, ...props }: Props) {
  // const ctx = React.useContext(AuthHandlerContext);
  // const { t } = useTranslation("common");



  // const [cellValue, setCellValue] = React.useState<"X" | "O">("X");

  return (
    <>
      { cellValue==null && (<Button color="secondary" {...props}>{cellValue}</Button>)}
      { cellValue=="X" && (<Button color="success" {...props}>{cellValue}</Button>)}
      { cellValue=="O" && (<Button color="info" {...props}>{cellValue}</Button>)}
    </>
);
}

export default GamesTicTacToeSquare;
