import * as React from "react";
import ThemeWrapper from "./ThemeWrapper";
import CustomDashboard from "./custom/Dashboard";
import AuthHandler, { defaultContent, defaultHeader } from "@/contexts/AuthHandler";
import AuthResponse from "../responses/Auth";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
}

const storageKey: string = "authContent";

export default function Layout({ children }: Props) {
  const [remember, setRemember] = React.useState(false);
  const [content, setContent] = React.useState<AuthResponse>(defaultContent);
  const [headers, setHeaders] = React.useState<HeadersInit>(defaultHeader);

  function setBoth(content: AuthResponse) {
    setContent(content);
    setHeaders({
      "Content-type": "application/json",
      "Authorization": `Bearer ${content.token}`
    });
  }

  useEffect(() => {
    let x = localStorage.getItem(storageKey) ?? sessionStorage.getItem(storageKey);
    if (x === null) {
      setContent(defaultContent);
      setHeaders(defaultHeader);
    } else {
      setBoth(JSON.parse(x) as AuthResponse);
    }
  }, []);

  const handle = React.useMemo(() => ({
    login: (remember: boolean, content: AuthResponse) => {
      setBoth(content);
      remember ? localStorage.setItem(storageKey, JSON.stringify(content)) :
        sessionStorage.setItem(storageKey, JSON.stringify(content));
    },
    logout: () => {
      setContent(defaultContent);
      setHeaders(defaultHeader);
      localStorage.removeItem(storageKey);
      sessionStorage.removeItem(storageKey);
    }
  }), []);

  return (
    <ThemeWrapper>
      <AuthHandler.Provider
        value={{
          remember: remember,
          content: content,
          headers: headers,
          handle: handle
        }}
      >
        <CustomDashboard>
          {children}
        </CustomDashboard>
      </AuthHandler.Provider>
    </ThemeWrapper>
  );
}
