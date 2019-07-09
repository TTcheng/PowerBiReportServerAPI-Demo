import * as React from 'react';
import {api} from "./api";
import {Redirect, Route, Switch} from "react-router-dom";
import {Navbar} from "./navbar";
import CatalogItemCard from "./components/catalog-item-card/CatalogItemCard"
import ReportView from "./components/report-view/ReportView";
import {Loading} from "./components/Loading";
import BreadCrumb from "./components/bread-crumb/BreadCrumb";

export class Home extends React.Component {
  state = {path: "/", items: null, view: {}, user: {}};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    api.meAsync().then((user) => this.setState({user}));
    api.getFolderItemsAsync().then((items) => this.setState({items: items.sort((a, b) => a.Type.localeCompare(b.Type))}));
  }

  /**
   * 打开文件夹
   * @param path power bi 对象路径
   */
  openFolder = (path) => {
    console.debug("openFolder", path);
    api.getFolderItemsAsync(path)
      .then((items) => this.setState({
        path: path,
        items: items.sort((a, b) => a.Type.localeCompare(b.Type))
      }));
  };

  render() {
    const {items, user, path} = this.state;
    if (!items){
      return (<Loading/>);
    }

    return (
      <div>
        <section className="hero is-warning is-small">
          <div className="hero-head">
            <Navbar user={user} path={path}/>
          </div>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Reports
              </h1>
            </div>
          </div>
        </section>
        <Switch>
          <Route path={"/folder"} render={() =>
            <section className="section">
              <div className="container">
                <BreadCrumb path={path} openFolder={this.openFolder}/>
                <div className="columns is-multiline">
                  {items.map((item) => <CatalogItemCard item={item} openFolder={this.openFolder}/>)}
                </div>
              </div>
            </section>
          }/>
          <Route path={"/view"}
                 render={(props) => <ReportView path={props.location.pathname} item={props.location.item}/>}/>
          <Redirect to={"/folder"}/>
        </Switch>
      </div>
    )
  }
}