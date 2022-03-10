import * as React from "react";
import AuthResponse from "@/models/Auth";

interface AuthHandlerType {
  logged: boolean,
  content: AuthResponse | null,
  setContent: () => void,
  headers: HeadersInit
}

const defaultAuthHandler = {
  logged: false,
  content: null,
  setContent: () => {},
  headers: { "Content-type": "application/json" }
};

const AuthHandlerContext = React.createContext<AuthHandlerType>(defaultAuthHandler);

export { defaultAuthHandler };
export type { AuthHandlerType };
export default AuthHandlerContext;
