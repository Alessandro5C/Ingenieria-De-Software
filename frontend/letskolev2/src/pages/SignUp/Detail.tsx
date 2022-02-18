import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { User } from '../../models/user';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CustomTextField from '../../components/custom-text-field/custom-text-field';
import CustomSelect from '../../components/custom-select/custom-select';
import apiUsers from '../../api/api.user';
import { useHistory } from 'react-router-dom';

interface Props {
    email: string;
}

function Detail({email}: Props) {

  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    student: true,
    numTelf: '',
    email: 'admin@gmail.com',
    birthday: new Date(),
    school: '',
  });
  
  const history = useHistory();
  
  useEffect(() => {
    setUser({...user, email: email});
  }, [email]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    apiUsers.add(user).then(
      (appUserResponse) => {
        if (appUserResponse) {
          window.alert("Perfect, you are there");
          history.push(`/dashboard/${appUserResponse.id}`);
          return;
        }
        else {
          window.alert("Something went wrong, try again");
        }
      }
    )
  }

  function changeValueUserLogin(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>){
      const { value, name } = event.target;
      setUser({...user, [name]: value});
  }
  
  function changeSchool(value: string) {
      setUser({...user, school: value});
  }
  
  return (
    <Box
      sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}
    >
      <form onSubmit={handleSubmit}>
      <Avatar sx={{m: 1, bgcolor: 'secondary-main'}}>
        <AccessibilityNewIcon />
      </Avatar>
      <Typography component="h2" variant="h4">
          Complete the details
      </Typography>
      <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField 
            value={user.name}
            name="name"
            label="Name"
            onChange={changeValueUserLogin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            value={user.email}
            name="email"
            label="Email address"
            onChange={changeValueUserLogin}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomSelect 
            value={user.student}
            label="¿Am I a student?"
            selection = {[
              {
                value: true,
                label: "Yes, I'm a student"
              },
              {
                value: false,
                label: "Not, I'm a teacher"
              }
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField 
            name="numTelf"
            value={user.numTelf}
            label="Cellphone"
            onChange={changeValueUserLogin}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            name="school"
            value={user.school}
            label="School"
            onChange={changeValueUserLogin}
          />
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2 }}
        >
          Submit
        </Button>

      </Grid>

      </Box>

      </form>
    </Box>
  )
}

export default Detail