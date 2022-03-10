import React from 'react';
import { useParams } from "react-router-dom";
import apiUsers from '../api/api.user';
import { User } from '../models/user';
import { isUser } from './SignUp';

export const InitUser = {
    id: '',
    displayedName: '',
    email: '',
    phoneNumber: '',
    birthday: new Date(),
    school: '',
}

export function Welcome() {
  const { id } = useParams<{ id: string}>();
  const [user, setUser] = React.useState<User>(InitUser);

  return (
    <div>Welcome {user.displayedName} </div>
  );
}