import * as React from "react";

type ThemeModeType = "light" | "dark";

interface ThemeModeProps {
  mode: ThemeModeType;
  setMode: (mode: ThemeModeType) => void;
}

const ThemeModeContext = React.createContext<ThemeModeProps>({
  mode: "light",
  setMode: (mode) => {}
});

export type { ThemeModeType, ThemeModeProps };
export default ThemeModeContext;
