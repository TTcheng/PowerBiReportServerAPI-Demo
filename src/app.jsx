import * as React from 'react';
import * as reactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./home";

reactDOM.render(
  (
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  ),
  document.getElementById('container')
);