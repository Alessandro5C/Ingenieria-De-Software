import * as React from "react";

type ThemeModeType = "light" | "dark";

interface ThemeModeProps {
  mode: ThemeModeType,
  setModeTo: {
    Light: () => void,
    Dark: () => void
  }
}

const ThemeModeContext = React.createContext<ThemeModeProps>({
  mode: "light",
  setModeTo: {
    Light: () => {},
    Dark: () => {}
  }
});

export type { ThemeModeType, ThemeModeProps };
export default ThemeModeContext;
