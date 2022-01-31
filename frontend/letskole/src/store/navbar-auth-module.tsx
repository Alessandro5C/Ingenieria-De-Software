import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import useStyles from "../components/profile-section/styles/use-styles";
import {Avatar, Button, ButtonBase, Card, CardMedia} from '@material-ui/core';
import {ApplicationUserResponse} from "../models/auth/application-user-response";
import {Link, useHistory} from "react-router-dom";
import authService from "../api/auth/auth.service";
import logo from "./logo.png";
import "./alessandro.css";

interface Props {
    open: boolean;
    toggleDrawer: () => void;
}

function NavbarAuthModule({ toggleDrawer, open }: Props) {
    const classes = useStyles();
    const history = useHistory();
    const appUserData:ApplicationUserResponse = Object.assign(new ApplicationUserResponse,
        JSON.parse(localStorage.getItem('appUserData')));
    const [loggedIn, setLoggedIn] = useState(false);

    const login =( ()=>{
        setLoggedIn(true)
    });

    const logout =( ()=>{
        authService.logout();
        history.push("/");
        setLoggedIn(false)
    });

    useEffect(() => {
        if (appUserData.userId != 0) {
            setLoggedIn(true);
        }
    }, []);


    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge='start'
                        color='inherit'
                        aria-label='open drawer'
                        onClick={toggleDrawer}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
     
                    {/* <img src={logo} height="64px" width="64px"/> */}
                    <Card >
                            <CardMedia component='img' image={logo} height="64px" width="100%" className="AlessandroImg" />
                        </Card> 
                    <Typography
                        component='h1'
                        variant='h6'
                        color='inherit'
                        noWrap
                        style={{
                            flexGrow: 1,
                            display: "flex",
                            justifyContent: "center",
                            padding: "20px"
                        }}
                    >
                        LetSkole 

                        
                    </Typography>
                    { !loggedIn  && (
                        <Button
                            hidden={true}
                            onClick={login}
                            variant="contained"
                            color={"primary"}
                        >
                            Click aqui luego de iniciar sesión
                        </Button>
                    )}
                    { loggedIn  && (
                        <Button
                        hidden={true}
                        onClick={logout}
                        variant="contained"
                        color={"secondary"}
                        >
                            {appUserData.email}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default NavbarAuthModule;
