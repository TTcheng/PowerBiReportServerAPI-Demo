import * as React from 'react';
import * as reactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';
import {Home} from "./home";

reactDOM.render(
  (
    <HashRouter>
      <Route path="/" render={(props) => <Home path={props.location}/>}/>
    </HashRouter>
  ),
  document.getElementById('container')
);