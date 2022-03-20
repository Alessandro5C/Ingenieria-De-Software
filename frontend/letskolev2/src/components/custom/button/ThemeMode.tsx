// my own files
import ThemeModeContext, { ThemeModeType } from '../../../context/ThemeMode';

// react
import React, { useContext } from 'react';

// material-ui
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// material-icons
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness3Icon from '@mui/icons-material/Brightness3';

export default function ThemeMode() { 
  const ctx = useContext(ThemeModeContext);
  
  return (
    <ToggleButtonGroup
      exclusive
      color="primary"
      value={ctx.mode}
    >
      <ToggleButton onClick={ctx.setModeTo.Light} value="light" sx={{ mx: 5}}>
        <Brightness7Icon />
      </ToggleButton>
      <ToggleButton onClick={ctx.setModeTo.Dark} value="dark" sx={{ mx: 5}}>
        <Brightness3Icon />
      </ToggleButton>

    </ToggleButtonGroup>
  );
}
