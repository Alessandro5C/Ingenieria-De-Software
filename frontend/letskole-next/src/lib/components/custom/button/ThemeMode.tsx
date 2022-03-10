import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";

function CustomButtonThemeMode() {
  const ctx = React.useContext(ThemeModeContext);
  const [mode, setMode] = React.useState<ThemeModeType>(ctx.mode);

  function handleChange(
    event: React.MouseEvent<HTMLElement>,
    newMode: ThemeModeType
  ) {
    if (newMode !== null)
      setMode(newMode);
  }

  return (
    <ToggleButtonGroup
      exclusive
      color="primary"
      value={mode}
      onChange={handleChange}
    >
      <ToggleButton onClick={ctx.setModeTo.Light} value="light">
        <Brightness7Icon sx={{ mr: 1 }}/>{`Light`}
      </ToggleButton>
      <ToggleButton onClick={ctx.setModeTo.Dark} value="dark">
        <Brightness3Icon sx={{ mr: 1 }}/>{`Dark`}
      </ToggleButton>
    </ToggleButtonGroup>

  );
}

export default CustomButtonThemeMode;