import { ReactNode, useReducer } from 'react';
import UserContext from '../context/User/usercontext';
import { userReducer } from '../context/User/userreducer';
import { initialUserState } from '../context/User/userstate';

interface Props {
    children?: ReactNode;
}

export default function UserCover({children}: Props){
  // TODO: here cut and paste here User wrapper, it means provider and context which is currently in App.tsx
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      {children}
    </UserContext.Provider>
  );
}