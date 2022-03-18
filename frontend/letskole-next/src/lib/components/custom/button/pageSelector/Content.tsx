import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";

const whichColor = (current: boolean) => (current ? "primary" : "inherit");

interface ContentType {
  href: string;
  text: string;
  icon: (current: boolean) => JSX.Element;
}

const profilePage = {
  href: "/users/profile",
  text: "common:pages:txt-profile",
  icon: (current: boolean) =>
    <AccountBoxOutlinedIcon color={whichColor(current)}/>
};

const activitiesPage = {
  href: "/",
  text: "common:pages:txt-activities",
  icon: (current: boolean) =>
    <AssignmentOutlinedIcon color={whichColor(current)}/>
};

const groupsPage = {
  href: "/",
  text: "common:pages:txt-groups",
  icon: (current: boolean) =>
    <GroupsOutlinedIcon color={whichColor(current)}/>
};

const gamesPage = {
  href: "/games",
  text: "common:pages:txt-games",
  icon: (current: boolean) =>
    <ExtensionOutlinedIcon color={whichColor(current)}/>
};

const CustomButtonPageSelectorContent: ContentType[] = [
  profilePage,
  activitiesPage,
  groupsPage,
  gamesPage
];

export default CustomButtonPageSelectorContent;