// // import * as React from "react";
// // import ToggleButton from "@mui/material/ToggleButton";
// // import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// // import Brightness3Icon from "@mui/icons-material/Brightness3";
// // import Brightness7Icon from "@mui/icons-material/Brightness7";
// // import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // // import { ListItemButton, ListItemText } from "@mui/material";
// // import AssignmentIcon from "@mui/icons-material/Assignment";
// // import { useRouter } from "next/router";
// // import ListSubheader from "@mui/material/ListSubheader";
// // import ListItemText from "@mui/material/ListItemText";
// // import ListItemButton from "@mui/material/ListItemButton";
// // import Link, { LinkProps } from "next/link";
// // import CheckIcon from "@mui/icons-material/Check";
// // import list from "@mui/material/list";
// // import Container from "@mui/material/Container";
// // import { useTheme } from "@mui/material/styles";
// // import Divider from "@mui/material/Divider";
// // import CustomNextLink, { CustomNextLinkProps } from "../NextLink";
// //
// // const languages: { [key: string]: string } = {
// //   "en": "English",
// //   "es": "Español"
// // };
// //
// // interface Props<TData> {
// //   children?: React.ReactNode;
// //   items?: TData[];
// //   setItem: (item:TData) => void;
// //   setCurrent: (current:boolean) => void;
// //   // checkCurrentWith: TData;
// //   linkProps: LinkProps;
// //   // checkIfCurrent: (item: TData) => boolean;
// //   checkWith: TData | undefined;
// //   // onClick: () => void;
// // }
// //
// // function CustomDrawerList<TData>({ children, ...props }: Props<TData>) {
// //
// //   return (
// //     <list disablePadding>
// //       {props.items?.map((item, i) => {
// //         // const isCurrent = props.checkIfCurrent(item);
// //         const current = item === props.checkWith;
// //         props.setCurrent(current);
// //
// //         return (
// //           <div key={i}>
// //             <ListItem
// //               disablePadding
// //               sx={(theme) => ({
// //                 mt: "3px",
// //                 mb: "3px",
// //                 "& .MuiListItemButton-root": {
// //                   "&.Mui-selected": {
// //                     outline: "1px solid",
// //                     outlineColor: theme.palette.primary.main
// //                   }
// //                 }
// //               })}
// //             >
// //               <CustomNextLink {...props.linkProps} disabled={current} passHref>
// //                 <ListItemButton
// //                   component="a"
// //                   selected={current}
// //                   onClick={() => { document.cookie = `NEXT_LOCALE=${item}`;}}
// //                 >
// //                   {children}
// //                 </ListItemButton>
// //               </CustomNextLink>
// //             </ListItem>
// //             <Divider variant="middle"/>
// //           </div>
// //         );
// //       })}
// //     </list>
// //   );
// // }
// //
// // export default CustomDrawerList;
//
// import * as React from "react";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import Brightness3Icon from "@mui/icons-material/Brightness3";
// import Brightness7Icon from "@mui/icons-material/Brightness7";
// import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// // import { ListItemButton, ListItemText } from "@mui/material";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { useRouter } from "next/router";
// import ListSubheader from "@mui/material/ListSubheader";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemButton from "@mui/material/ListItemButton";
// import Link, { LinkProps } from "next/link";
// import CheckIcon from "@mui/icons-material/Check";
// import list from "@mui/material/list";
// import Container from "@mui/material/Container";
// import { Theme, useTheme } from "@mui/material/styles";
// import Divider from "@mui/material/Divider";
// import CustomDrawerListButton from "./Button";
//
// interface Props {
//   children?: React.ReactNode;
// }
//
// const DrawerListProps = {
//   ListItem: {
//     disablePadding: true,
//     sx: (theme: Theme) => ({
//       mt: "3px",
//       mb: "3px",
//       "& .MuiListItemButton-root": {
//         "&.Mui-selected": {
//           outline: "1px solid",
//           outlineColor: theme.palette.primary.main
//         }
//       }
//     })
//   }
// };
//
// function CustomDrawerList({ children }: Props) {
//
//   return (
//     <list disablePadding>
//       {children}
//     </list>
//   );
// }
//
// // export default CustomDrawerList;
//
// // {
// //   current && (
// //     <ListItemIcon>
// //       <CheckIcon color="primary"/>
// //     </ListItemIcon>
// //   );
// // }
// // <ListItemText
// //   inset={!current}
// //   primary={languages[item]}
// //   sx={current ? { color: "primary.main" } : {}}
// // />;
