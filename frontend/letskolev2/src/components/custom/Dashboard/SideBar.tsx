import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { mainListItems, secondaryListItems, visualizationOptions, languagesOptions } from './listitems';
import { drawerWidth } from './Dashboard';


interface Props {
    open: boolean,
    toggleDrawer: () => void,
}

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) =>({
        '& .MuiDrawer-paper':{
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition:theme.transitions.create('width',{
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(! open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                  width: theme.spacing(9),
                },
            }),
        },
    }),
);


export default function SideBar (props: Props) {
  return (
    // Alessandro: Tu Custom Drawer es como el Sidebar
    <Drawer variant="permanent" open={props.open}>
      <Toolbar sx={{
        display: 'flex',
        alignItems:'center',
        justifyContent:'flex-end',
        px:[1],
      }}>
        <IconButton onClick={props.toggleDrawer}>
          <ChevronLeftIcon/>
        </IconButton>
      </Toolbar>
      <Divider/>
      <List component="nav">
        {mainListItems}
        <Divider sx={{my:1}}/>
        {visualizationOptions}
        <Divider sx={{my:1}}/>
        {languagesOptions}
        <Divider sx={{my:1}}/>
        {secondaryListItems} 
      </List>
    </Drawer>
  );
}