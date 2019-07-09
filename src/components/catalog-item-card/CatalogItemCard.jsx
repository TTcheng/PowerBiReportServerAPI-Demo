import {Link} from "react-router-dom";
import * as moment from "moment";
import * as React from "react";
import {CatalogItemType} from "../../api";

export default class CatalogItemCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initTagColor(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.initTagColor(nextProps);
  }

  initTagColor = (props) => {
    const {item} = props;
    switch (item.Type) {
      case CatalogItemType.Report:
        this.setState({tagColor: 'is-danger'});
        break;
      case CatalogItemType.PowerBIReport:
        this.setState({tagColor: 'is-warning'});
        break;
      case CatalogItemType.Folder:
        this.setState({tagColor: 'is-info'});
        break;
      default:
        this.setState({tagColor: 'is-primary'});
        break;
    }
  };

  warpTitle = () => {
    const {item, openFolder} = this.props;
    if (item.Type === CatalogItemType.Folder) {
      return <a onClick={() => openFolder(item.Path)}>{item.Name}</a>;
    }
    if (item.Type.endsWith(CatalogItemType.Report)) {
      return <Link to={{pathname: "/view", item}}>{item.Name}</Link>;
    }
    return <strong>{item.Name}</strong>
  };

  render() {
    const {item} = this.props;
    const {tagColor} = this.state;
    return (
      <div className="column is-3">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {this.warpTitle()}<br/>
              {item.Description}<br/>
              <small>@{item.ModifiedBy}</small>
              <br/>
              <small>{moment(item.ModifiedDate).format('lll')}</small>
              <br/>
              <div className={`tag ${tagColor}`}>{item.Type.toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
