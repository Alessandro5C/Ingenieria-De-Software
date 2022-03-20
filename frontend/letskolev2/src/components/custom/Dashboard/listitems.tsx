// my own files
import { ListItem } from '@mui/material';
import CustomButtonThemeMode from '../button/ThemeMode';
import CustomButtonLangSelector from '../button/LangSelector';
// react
import * as React from 'react';

// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';


export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="User" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <EventNoteIcon />
      </ListItemIcon>
      <ListItemText primary="Activity" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Games" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Groups" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);

export const visualizationOptions = (
  <>
    <ListSubheader inset>Visualización</ListSubheader>
    <ListItem>
      <CustomButtonThemeMode />
    </ListItem>
  </>
)

export const languagesOptions = (
  <>
    <ListSubheader inset>Languages</ListSubheader>
    <CustomButtonLangSelector />
  </>
)