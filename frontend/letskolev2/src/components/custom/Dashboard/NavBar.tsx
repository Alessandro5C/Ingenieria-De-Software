import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useHistory } from "react-router-dom";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { drawerWidth } from './Dashboard';

interface Props {
    open: boolean,
    toggleDrawer: () => void,

}
interface AppBarProps extends MuiAppBarProps{
    open?: boolean;
}
const AppBar = styled(MuiAppBar,{ 
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({theme, open})=>({
        zIndex:theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width','margin'],{
            easing:theme.transitions.easing.sharp,
            duration:theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft:drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width','margin'],{
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

export default function NavBar(props: Props){
  const history = useHistory();

  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    window.localStorage.clear();
    history.push('/');
  }

  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        { // This trick is for making "Dashboard" centered
          // if it is not opened, it shor icon
          // else, an empty div is provided, just for flexbox justifycontent above
          !props.open ? (<IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={props.toggleDrawer}>
            <MenuIcon />
          </IconButton>)
          : <div></div> 
        }
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap >
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
        <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}