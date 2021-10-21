import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter}from "react-router-dom";
import Body from './components/body/body';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Menu from './components/menu/menu';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header/>
      <Menu/>
      <Body/>
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
