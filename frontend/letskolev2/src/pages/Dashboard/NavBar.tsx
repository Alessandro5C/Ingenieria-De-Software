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
import UserContext from '../../context/usercontext';

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
  const ctx = React.useContext(UserContext);
  const history = useHistory();

  function handleLogout(e: React.MouseEvent<HTMLButtonElement>) {
    window.localStorage.clear();
    history.push('/');
    ctx.setlogged.FALSE();
  }

  return (
    <AppBar position="absolute" open={props.open}>
      <Toolbar sx={{pr: '24px,'}}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Open drawer"
          onClick={props.toggleDrawer}
          sx={{
            marginRight:'36px',
            ...(props.open && {display: 'none'}),
          }}>
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{flexGrow: 1}}>
          Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleLogout}>
        <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}