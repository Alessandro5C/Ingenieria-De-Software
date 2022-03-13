import * as React from "react";
import { UserActions } from "./useractions";
import { initialUserState, UserState } from "./userstate";

interface UserInfo {
    id: string,
    logged: boolean,
    setlogged: {
      TRUE: () => void, 
      FALSE: () => void
    }
};

// const UserContext = React.createContext<UserInfo>({
//   // State implicit
//   id: '',
//   logged: false,
//   setlogged: {
//     TRUE: () => {}, 
//     FALSE: () => {}
//   }
// });

const UserContext = React.createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserActions>;
}>({
  state: initialUserState,
  dispatch: () => undefined,
});

// export type { UserInfo };
export default UserContext;