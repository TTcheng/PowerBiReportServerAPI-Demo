import * as React from 'react';
import {api} from "./api";
import {Link} from "react-router-dom";
import {Navbar} from "./navbar";
import CatalogItemCard from "./catalog-item-card"

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {path: '/'};
  }

  componentDidMount() {
    api.meAsync().then((user) => this.setState({user}));
    api.getFolderItemsAsync().then((items) => this.setState({items: items.sort((a, b) => a.Type.localeCompare(b.Type))}));
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({path: nextProps.path.pathname, items: undefined});
    api.getFolderItemsAsync(nextProps.path.pathname)
      .then((items) => this.setState({items: items.sort((a, b) => a.Type.localeCompare(b.Type))}));
  }

  render() {
    if (!this.state.items)
      return (
        <section className="hero is-warning is-fullheight">
          <div className="hero-head">
            <Navbar user={this.state.user}/>
          </div>
          <div className="hero-body">
            <div className="container has-text-centered"><h1 className="title">Loading Items...</h1></div>
          </div>
        </section>
      );

    return (
      <div>
        <section className="hero is-warning is-small">
          <div className="hero-head">
            <Navbar user={this.state.user}/>
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Reports
              </h1>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <BreadCrumb path={this.state.path}/>
            <div className="columns is-multiline">
              {this.state.items.map((item) => <CatalogItemCard item={item}/>)}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

let BreadCrumb = ({path}) => {
  let parts = path.substring(1).split('/');
  return (
    <nav className="breadcrumb is-large" aria-label="breadcrumbs">
      <ul>
        <li><Link to="/">Home</Link></li>
        {path.length > 1 && parts.map((part, idx) => <li><Link
          to={"/" + parts.slice(0, idx + 1).join('/')}>{part}</Link></li>)}
      </ul>
    </nav>
  )
};