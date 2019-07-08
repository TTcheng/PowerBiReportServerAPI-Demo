import * as React from "react";
import {api} from "./api";

export class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleFileUpload = (event) => {
    let files = event.target.files;
    api.uploadFileAsync(files[0]).then(
      () => location.reload()
    );
  };

  render() {
    return (
      <header className="nav">
        <div className="container">
          <div className="nav-left">
            <div className="nav-item is-paddingless"><h1 className="title">PowerBI Report Server API Demo</h1></div>
          </div>
          <div className="nav-right nav-menu">
            <div className="nav-item">
              <div className="file is-light">
                <label className="file-label">
                  <input type="file" className="file-input" onChange={this.handleFileUpload}/>
                  <span className="file-cta">
                      <span className="file-icon">
                          <i className="fa fa-upload"/>
                      </span>
                      <span className="file-label">Upload</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="nav-item"><h2 className="subtitle">{this.props.user && this.props.user.DisplayName}</h2>
            </div>
          </div>
        </div>
      </header>
    );
  }
}