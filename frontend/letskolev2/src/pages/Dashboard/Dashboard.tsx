import React, { EventHandler } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Route, useHistory, useRouteMatch } from "react-router-dom";
import NavBar from './NavBar';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { useParams } from "react-router-dom";
import { User } from '../../models/user';
import { isUser } from '../SignUpPage';
import apiUsers from '../../api/api.user';
import { setHeaderToken } from '../../api/api';
import { Switch } from 'react-router-dom';
import UserRouter from '../../router/user-router';
import WelcomePage1  from '../WelcomePage';
import UserPage from '../UserPage';
import UserContext from '../../context/usercontext';


function copyright(props:any) {
    return(
        <Typography variant = "body2" color ="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                LetSkole
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
export const drawerWidth: number = 240;

interface Props {
    changeLanguage?: (language: string) => void;
    children?: React.ReactNode;
}

export const InitUser = {
  id: '',
  displayedName: '',
  email: '',
  phoneNumber: '',
  birthday: new Date(),
  school: '',
}

export function Dashboard({ children }: Props) {
  const ctx = React.useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const { id } = useParams<{ id: string}>();
  const [user, setUser] = React.useState<User>(InitUser);
  let match = useRouteMatch();

  const toggleDrawer = () => {
      setOpen(!open);
      console.log(open);
  };  
  React.useEffect(() => {

      const token = window.localStorage.getItem('token');
      if(token == null) {
          window.alert('Need to login before using this app');
          history.push('/');
      }else {
        // Todo verify the token
        setHeaderToken(); 
        apiUsers.get(id).then(
          (appUserResponse) => {
            if(appUserResponse && isUser(appUserResponse)){
              setUser(appUserResponse);
              console.log(appUserResponse);
            } else{
              window.localStorage.clear();
              history.push('/');
            }
          }
        )
      }
  }, []);  
  
  const mdTheme = createTheme();

  if(ctx.logged) {
    return(
    
      <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box sx={{display: 'flex'}}>
    
        <NavBar open={open} toggleDrawer={toggleDrawer}/>
        <SideBar open={open} toggleDrawer={toggleDrawer}/>
        <MainContent children={children} />
      
      </Box>
      </ThemeProvider>
    )
  }
  else {
    return (
      <div>
        {children}
      </div>
    );
  }

}

