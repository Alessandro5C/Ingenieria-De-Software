import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function CustomButtonThemeMode() {
  const ctx = React.useContext(ThemeModeContext);

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newMode: ThemeModeType
  ) {
    if (newMode !== null)
      ctx.setMode(newMode);
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={ctx.mode}
      onChange={handleChange}
      color="primary"
      fullWidth
      sx={ (theme) => ({
        "& .MuiToggleButtonGroup-grouped": {
          borderColor: `${theme.palette.primary.main}80`,
          "&.Mui-selected": {
            borderColor: theme.palette.primary.main,
          }
        }
      })}
    >
      <ToggleButton value="light">
        <LightModeOutlinedIcon/>
      </ToggleButton>
      <ToggleButton value="dark">
        <DarkModeOutlinedIcon/>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default CustomButtonThemeMode;