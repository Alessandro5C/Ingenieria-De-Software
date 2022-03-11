import * as React from "react";

interface UserInfo {
    id: string,
    logged: boolean,
    setlogged: {
      TRUE: () => void, 
      FALSE: () => void
    }
};

const UserContext = React.createContext<UserInfo>({
  id: '',
  logged: false,
  setlogged: {
    TRUE: () => {}, 
    FALSE: () => {}
  }
});

// export type { UserInfo };
export default UserContext;