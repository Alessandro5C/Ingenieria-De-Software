import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";

interface Props {
  children?: React.ReactNode;
}

const storageKey: string = "ThemeMode";
const defaultMode: ThemeModeType = "light";

function ThemeWrapper({ children }: Props) {
  // NOTE: There will be problems using useMediaQuery with SSR
  // const themePreference: PaletteMode = useMediaQuery(
  //   "(prefers-color-scheme: dark)") ? "dark" : "light";

  const [mode, setMode] = React.useState<ThemeModeType>(defaultMode);

  React.useEffect(() => {
    // Check if user have a theme mode preference
    let x = localStorage.getItem("ThemeMode");
    setMode((x === "light" || x === "dark") ? x : defaultMode);
  }, []);

  const setModeTo = React.useMemo(() => ({
    Mode: (mode: ThemeModeType) => {
      setMode(mode);
      localStorage.setItem(storageKey, mode);
    }
  }), []);

  const theme = React.useMemo(() =>
    createTheme({
      palette: {
        mode: mode
        // @ts-ignore
        // neutral: {
        //   main: "#64748B",
        //   contrastText: "#fff"
        // },
      }
    }), [mode]
  );

  return (
    <ThemeModeContext.Provider
      value={{
        mode: mode,
        setMode: setModeTo.Mode
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export default ThemeWrapper;
