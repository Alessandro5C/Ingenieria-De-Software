import React from 'react'
import {Route} from 'react-router';
import Header from '../header/header';

const Body = () => {
    return  <div>
        <Route  path = "/" exact component={Header}></Route>
    </div>;
}

export default Body
