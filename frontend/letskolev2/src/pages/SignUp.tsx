import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../models/user';
import apiUsers from '../api/api.user';
import { ApplicationUserLogin } from '../models/aplication-user-login';
import authService from '../api/api.authservice';

export default function SingUp() {
    const [ userLogin, setUserLogin ] = useState<ApplicationUserLogin>({
        email: 'asdsadas',
        password: 'sasdasd'
    });

    // const [user, setUser] = useState<User>({
    //     id: 0,
    //     name: '',
    //     student: false,
    //     numTelf: '',
    //     email: '',
    //     birthday: new Date(),
    //     school: '',
    // });

    // const { id } = useParams<{ id: string}>();
    
    // async function getUser(id: string){
    //     await apiUsers.login(id).then((data) => {
    //         data && setUser(data);
    //     });
    // }

    // useEffect(
    //     () => { id && getUser(id)
    // }, [id]);
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
           
    if(!userLogin.email.includes('@')){
        window.alert("Email must have '@'");
        return;
      }
      await authService.register(userLogin)
      .then(data => {
          if(data && data.email && data.userId && data.token  ){
              console.log ("Primera parte finalizada");
          }else{
              console.log("No se pudo registrar");
          }
      })
    }
    // function changeValueUserLogin(event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
    //     const {value,name}=event.target;
    //     setUserLogin({...userLogin,[name]: value});
    // }
    function changeValueUserLogin(
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ){
        const { value, name } = event.target;
        setUserLogin({...userLogin, [name]: value});
      }
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
            <form onSubmit={handleSubmit} >

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
                            name="email"
                            required
                            fullWidth
                            label="Email Address"
                            autoFocus
                            value={userLogin.email}
                            onChange={(event) => changeValueUserLogin(event)}
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
                            value={userLogin.password}
                            onChange={(event) => changeValueUserLogin(event)}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2 }}
                        >
                        register
                    </Button>
                </Grid>
            </Box>  
            </form>
        </Box>
      </React.Fragment>
  );
}
