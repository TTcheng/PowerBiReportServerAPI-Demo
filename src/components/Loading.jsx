import React from 'react';
import {Navbar} from "../navbar";

export const Loading = (props) => {
  return <section className="hero is-warning is-fullheight">
    <div className="hero-head">
      <Navbar user={props.user}/>
    </div>
    <div className="hero-body">
      <div className="container has-text-centered"><h1 className="title">Loading Items...</h1></div>
    </div>
  </section>
};