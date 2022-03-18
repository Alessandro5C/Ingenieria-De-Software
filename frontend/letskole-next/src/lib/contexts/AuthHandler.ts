import * as React from "react";
import AuthResponse from "../responses/Auth";

const defaultContent = { id: "", token: "", valid: false };
const defaultHeader = { "Content-type": "application/json" };

interface AuthHandlerType {
  remember: boolean;
  content: AuthResponse;
  headers: HeadersInit;
  handle: {
    login: (remember: boolean, content: AuthResponse) => void,
    logout: () => void,
  };
}

const AuthHandlerContext = React.createContext<AuthHandlerType>({
  remember: false,
  content: { id: "", token: "", valid: false },
  headers: {},
  handle: {
    login: () => {},
    logout: () => {}
  }
});

export { defaultContent, defaultHeader };
export type { AuthHandlerType };
export default AuthHandlerContext;
