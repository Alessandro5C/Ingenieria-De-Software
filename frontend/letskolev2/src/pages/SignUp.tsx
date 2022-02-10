import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../models/user';
import apiUsers from '../api/api.user';
import { ApplicationUserLogin } from '../models/aplication-user-login';

export default function SingUp() {
    const [ userLogin, setUserLogin ] = useState<ApplicationUserLogin>({
        email: '',
        password: ''
    });

    const [user, setUser] = useState<User>({
        id: 0,
        name: '',
        student: false,
        numTelf: '',
        email: '',
        birthday: new Date(),
        school: '',
    });

    // const { id } = useParams<{ id: string}>();
    
    // async function getUser(id: string){
    //     await apiUsers.login(id).then((data) => {
    //         data && setUser(data);
    //     });
    // }

    // useEffect(
    //     () => { id && getUser(id)
    // }, [id]);

    return (
        <React.Fragment>
            
            <Box
                sx = {{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <form>
            <Avatar sx={{m: 1, bgcolor: 'secondary-main'}}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h2" variant="h4">
                Sign Up
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="email"
                            name="emailadress"
                            required
                            fullWidth
                            label="Email Address"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            autoComplete="password"
                            type="password"
                        />
                    </Grid>
                </Grid>
            </Box>  
            </form>
        </Box>
      </React.Fragment>
  );
}
