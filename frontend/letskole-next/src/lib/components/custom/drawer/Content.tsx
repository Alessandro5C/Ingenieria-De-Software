import * as React from "react";
import CustomButtonThemeMode from "../button/ThemeMode";
import CustomButtonLangSelector from "../button/langSelector/LangSelector";
import CustomButtonPageSelector from "../button/pageSelector/PageSelector";
import CustomButtonLog from "../button/Log";

enum show { always, logged, notLogged }

interface ContentType {
  [key: string]: {
    render: show;
    title: string | boolean;
    component: JSX.Element;
  };
}

const CustomDrawerContent: ContentType = {
  "nav": {
    render: show.logged,
    // title: "common:drawer:ttl-nav",
    title: false,
    component: <CustomButtonPageSelector/>
  },
  "mode": {
    render: show.always,
    title: "common:drawer:ttl-mode",
    component: <CustomButtonThemeMode/>

  },
  "lang": {
    render: show.always,
    title: "common:drawer:ttl-lang",
    component: <CustomButtonLangSelector/>
  },
  "login": {
    render: show.logged,
    title: true,
    component: <CustomButtonLog logged={true}/>
  },
  "logout": {
    render: show.notLogged,
    title: true,
    component: <CustomButtonLog logged={false}/>
  }
};

export { show };
export default CustomDrawerContent;