import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ThemeModeContext, { ThemeModeType } from "@/contexts/ThemeMode";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
// import { ListItemButton, ListItemText } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/router";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import List from "@mui/material/List";
import Container from "@mui/material/Container";

const languages: { [key: string]: string } = {
  "en": "English",
  "es": "Español"
};

function CurrentLang(language: string) {
  return (
    <ToggleButton value="current" selected disabled>
      {language}
    </ToggleButton>
  );
}

function CustomButtonLangSelector() {
  // const { locale, locales, pathname, asPath, query, ...router } = useRouter();
  const { locale, locales } = useRouter();

  return (
    <>
      <ListSubheader inset>Languages</ListSubheader>
      <Container maxWidth="xl" >
        <List disablePadding>

        {
          locales?.map((item, i) => {
            const current = item === locale;

            return (
              <ListItem key={i} disablePadding>
                        {/*sx={{ mt: "-3px" }}>*/}
                {/*//mb: "-3px" }}>*/}
                {current && (
                  <ListItemButton selected disabled>
                    <ListItemIcon>
                      <CheckIcon/>
                    </ListItemIcon>
                    <ListItemText primary={languages[item]}/>
                  </ListItemButton>
                )}
                {!current && (
                  <Link href="" locale={item} passHref>
                    <ListItemButton
                      component="a"
                      onClick={() => { document.cookie = `NEXT_LOCALE=${item}`;}}
                      // sx={{ height: 10, witdh: 10 }}
                    >
                      <ListItemText inset primary={languages[item]}/>
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            );
          })
        }
        </List>
      </Container>
    </>
  );
}

export default CustomButtonLangSelector;
