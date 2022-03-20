import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import ThemeModeContext, { ThemeModeType } from '../context/ThemeMode';

interface Props {
  children?: ReactNode;
}

const storageKey: string = "ThemeMode";
const defaultMode: ThemeModeType = "light";

function ThemeCover({children}: Props) {
  const [mode, setMode] = useState<ThemeModeType>(defaultMode);
  
  useEffect(() => {
    // Check if the is theme mode saved in localstorage
    let x = localStorage.getItem("ThemeMode");
    setMode((x === "light" || x === "dark") ? x : defaultMode);
  }, []);

  // for mode in localstorage
  const setModeTo = useMemo(() => 
    ({
        Light: () => {
          setMode("light");
          localStorage.setItem(storageKey, "light");
        },
        Dark: () => {
          setMode("dark");
          localStorage.setItem(storageKey, "dark");
        }
      }
  ), []);

  // For theme provider
  const theme = useMemo(() => 
    createTheme({
      palette: {
          mode: mode
      },
      spacing: 5
    }), [mode]);

  return (
    <ThemeModeContext.Provider
      value={{
        mode: mode,
        setModeTo: setModeTo
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export default ThemeCover