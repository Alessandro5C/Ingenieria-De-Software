import { createTheme } from "@mui/material";
import * as React from "react";
import UserContext from "./usercontext";

interface Props {
  children?: React.ReactNode;
};

const storageKey: string = "ThemeMode";
// const defaultMode: UserInfo = { id: '', logged: false};

function UserProvider({ children }: Props) {
  const [logged, setLogged] = React.useState<boolean>(false);
  const setLoggedTo = {
    TRUE: () => {
      setLogged(true);
    },
    FALSE: () => {
      setLogged(false);
    },
  };

  // return (
  //   <UserContext.Provider value={{ id: '', logged: logged, setlogged: setLoggedTo}}>
  //     {children}
  //   </UserContext.Provider>
  //  );
}

export default UserProvider;