import {CatalogItem} from './api';
import axiosLib from "axios";

export class Api {
  serverUrl;
  axios;

  constructor(server = 'http://192.168.12.158:80/reports') {
    this.serverUrl = server;
    this.axios = axiosLib.create({
      baseURL: `${server}/api/v2.0`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }

  requestOptions(method, body) {
    return {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      method,
      body: JSON.stringify(body)
    }
  }

  async getFolderItemsAsync(path = '/') {
    let response = await this.axios.get(`/Folders(Path='${path}')/CatalogItems`);
    let items = response.data;
    return items.value;
  }

  async postCatalogItemAsync(item) {
    let url = `${this.serverUrl}/CatalogItems`;
    let response = await this.axios.post('/CatalogItems', item);
    let createdItem = response.data;
    return createdItem;
  }

  async meAsync() {
    let url = `${this.serverUrl}/me`;
    let response = await this.axios.get('/me');
    let item = response.data
    return item;
  }

  async uploadFileAsync(file) {
    let fileInfo = await this.getFileInfo(file);
    let path = window.location.hash.substring(1);
    path = path.length > 1 ? path : '';
    let item = {
      Content: fileInfo.content,
      Path: `${path}/${fileInfo.name}`,
      Name: fileInfo.name,
      ContentType: fileInfo.contentType
    };

    switch (fileInfo.extension.toLocaleLowerCase()) {
      case 'rdl':
        item['@odata.type'] = '#Model.Report';
        break;
      case 'rsd':
        item['@odata.type'] = '#Model.DataSet';
        break;
      case 'rds':
        item.ContentType = 'text/xml';
        item['@odata.type'] = '#Model.Resource';
        break;
      case 'rsc':
        item['@odata.type'] = '#Model.Component';
        break;
      case 'rsmobile':
        item['@odata.type'] = '#Model.MobileReport';
        break;
      case 'pbix':
        item['@odata.type'] = '#Model.PowerBIReport';
        break;
      case 'xls':
      case 'xlsb':
      case 'xlsm':
      case 'xlsx':
      case 'csv':
        item['@odata.type'] = '#Model.ExcelWorkbook';
        break;
      default:
        item['@odata.type'] = '#Model.Resource';
        break;
    }

    return api.postCatalogItemAsync(item);
  }

  getFileInfo(file) {
    let p = new Promise < IFileInfo > ((res, rej) => {
      let reader = new FileReader();
      let fileInfo = {
        name: file.name,
        extension: file.name.substring(file.name.lastIndexOf('.') + 1),
        size: file.size
      };
      reader.onload = (metadata) => {
        fileInfo.content = reader.result.substring(reader.result.indexOf(',') + 1);
        fileInfo.contentType = reader.result.replace(/data:(.*);.*/, '$1');
        res(fileInfo);
      };

      reader.readAsDataURL(file);
    });

    return p;
  }
}

export const api = new Api();


export const CatalogItemType = {
  Unknown: "Unknown",
  Folder: "Folder",
  Report: "Report",
  DataSource: "DataSource",
  DataSet: "DataSet",
  Component: "Component",
  Resource: "Resource",
  Kpi: "Kpi",
  MobileReport: "MobileReport",
  LinkedReport: "LinkedReport",
  ReportModel: "ReportModel",
  PowerBIReport: "PowerBIReport",
  ExcelWorkbook: "ExcelWorkbook"
};
