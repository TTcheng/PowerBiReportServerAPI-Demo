import * as React from "react";

class BreadCrumb extends React.Component {
  render() {
    const {path, openFolder} = this.props;
    const parts = path.substring(1).split('/');
    return (
      <nav className="breadcrumb is-large" aria-label="breadcrumbs">
        <ul>
          <li><a onClick={() => openFolder("/")}>Root</a></li>
          {path.length > 1 && parts.map((part, idx) => <li><a
            onClick={() => openFolder("/" + parts.slice(0, idx + 1).join("/"))}>{part}</a></li>)}
        </ul>
      </nav>
    );
  }
}

export default BreadCrumb;