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
import { User } from '../../../models/user';
import apiUsers from '../../../api/api.user';
import { setHeaderToken } from '../../../api/api';


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
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  // const { id } = useParams<{ id: string}>();
  // const [user, setUser] = React.useState<User>(InitUser);
  // let match = useRouteMatch();


  const toggleDrawer = () => {
      setOpen(!open);
      console.log(open);
  };  

  return(
    <Box sx={{display: 'flex'}}>
      <NavBar open={open} toggleDrawer={toggleDrawer}/>
      <SideBar open={open} toggleDrawer={toggleDrawer}/>
      <MainContent children={children} />
    </Box>
  )
  


}

