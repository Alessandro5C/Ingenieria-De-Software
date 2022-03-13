import React, { EventHandler } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom";
import NavBar from './NavBar';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { useParams } from "react-router-dom";
import { User } from '../../models/user';
import { isUser } from '../SignUpPage';
import apiUsers from '../../api/api.user';
import { setHeaderToken } from '../../api/api';
import UserContext from '../../context/User/usercontext';


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
  // const ctx = React.useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const { state } = React.useContext(UserContext);

  // const { id } = useParams<{ id: string}>();
  // const [user, setUser] = React.useState<User>(InitUser);
  // let match = useRouteMatch();


  const toggleDrawer = () => {
      setOpen(!open);
      console.log(open);
  };  
  // React.useEffect(() => {
  //     // Todo verify the token
  //     const token = window.localStorage.getItem('token');
  
  //     if(token == null) {
  //         window.alert('Need to login before using this app');
  //         history.push('/');
  //     }else {
  //       apiUsers.get(state.id).then( // call api

  //         (appUserResponse) => {
  //           if(appUserResponse && isUser(appUserResponse)){ // check if user
  //             console.log('User logged correctly');

  //           } else{ // token incorrect
  //             window.localStorage.clear();
  //             history.push('/');
  //           }
  //         }
  //       )
  //     }
  // }, []);  
  
  // const mdTheme = createTheme();

  if(state.logged) { // if it is logged
    return(<>
      <CssBaseline />
      <Box sx={{display: 'flex'}}>
        <NavBar open={open} toggleDrawer={toggleDrawer}/>
        <SideBar open={open} toggleDrawer={toggleDrawer}/>
        <MainContent children={children} />
      </Box>
      </>
    )
  }
  else { // otherwise
    return (
      <div>
        {children}
      </div>
    );
  }

}

