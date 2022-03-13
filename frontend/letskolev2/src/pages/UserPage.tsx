// material-ui
import { Avatar, Box, Button, Container, IconButton, TextField } from "@mui/material";
import React, { MouseEvent, useContext, useEffect, useState } from "react";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import Typography from '@mui/material/Typography';
import DateTimePicker from '@mui/lab/DateTimePicker';
import EditIcon from '@mui/icons-material/Edit';

// laboratory
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

// files created by the application
import apiUsers from "../api/api.user";
import UserContext from "../context/User/usercontext";
import { User } from '../models/user';
import { isUser } from "./SignUpPage";

const initUser: User = {
  id: '',
  displayedName: '',
  email: '',
  phoneNumber: '',
  birthday: null,
  school: ''
}

export default function UserPage() {
  const [user, setUser] = useState<User>(initUser);
  const [edit, setEdit] = useState<boolean>(true);
  const { state } = useContext(UserContext);


  useEffect(() => {
    apiUsers.get(state.id).then(
      user => {
        if(user && isUser(user)){
          setUser(user);
        }
      }
    );
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // not to do default behaviour
    apiUsers.put(user);
  }

  const handleInput = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    setUser({...user, [name]: value});
  }

  const handleChangeBirthday = (newDate: Date | null) => {
    setUser({...user, 'birthday': newDate});
  }

  const handleedit = (event: MouseEvent<HTMLButtonElement>) => {
    setEdit(!edit);
  }


  return (
    <Container component="div" maxWidth="xs">
      <Typography variant="h4">Welcome to User Page</Typography>
      <IconButton onClick={handleedit}>
        <EditIcon />
      </IconButton>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleSharpIcon />
        </Avatar>
        <Typography component="h2" variant="h5">
          {user.displayedName}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1}}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="displayedName"
            onChange={handleInput}   
            value={user.displayedName}  
            disabled={edit}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            onChange={handleInput}   
            value={user.email}  
            disabled={edit}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            onChange={handleInput}   
            value={user.phoneNumber}  
            disabled={edit}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Birthday"
              value={user.birthday}
              onChange={handleChangeBirthday}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            label="School"
            name="school"
            onChange={handleInput}   
            value={user.school}  
            disabled={edit}
          />
          <Button type="submit" variant="contained">Save changes</Button>

        </Box>
      </Box>
    </Container>
  );
}