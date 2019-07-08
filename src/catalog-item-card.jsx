import {CatalogItemType} from "./api";
import {Link} from "react-router-dom";
import * as moment from "moment";
import * as React from "react";

export default class CatalogItemCard extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initTagColor(this.props);
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

  render() {
    const {item} = this.props;
    const {tagColor} = this.state;
    return (
      <div className="column is-3">
        <div className="card">
          <div className="card-content">
            <div className="content">
              {<Link to={item.Path || '/'}>{item.Name}</Link>}
              <br/>
              {/*{item.Type === CatalogItemType.Folder ? <Link to={item.Path || '/'}>{item.Name}</Link> :*/}
              {/*  <strong>{item.Name}</strong>}<br/>*/}
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
