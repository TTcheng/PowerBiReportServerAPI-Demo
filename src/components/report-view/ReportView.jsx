import React from 'react';
import {api} from "../../api";
import "./ReportView.css"

class ReportView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;
    if (item) {
      const url = `${api.serverUrl}/powerbi${item.Path}?rs:Embed=true`;
      return (
        <section className="section">
          <div className="container">
            <div className="iframe-container">
              <iframe src={url}>

              </iframe>
            </div>
          </div>
        </section>

      );
    }
    return <section className="section hero is-warning is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered"><h1 className="title">Loading Items...</h1></div>
      </div>
    </section>;
  }
}

export default ReportView;