import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedAPI } from 'src/app/models/detailedApiData';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  endpointURL: string;
  selectedRequestMethod: string;
  readonly requestMethods: Array<string>;
  responseData: any;
  responseError: any;
  endpointError: string;
  loadingState: boolean;

  dataSource!: DetailedAPI;
  flag_is_api!: string;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.endpointURL = '';
    this.selectedRequestMethod = 'GET';
    this.requestMethods = ['GET', 'POST', 'DELETE', 'PUT'];
    this.endpointError = '';
    this.loadingState = false;
  }

  categorias = [
    'Category1',
    'Category2',
    'Category3',
    'Category4',
    'Category5',
  ];

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apiIdFromRoute = Number(routeParams.get('id_api'));
    this.getApiInfo(apiIdFromRoute);
    this.flag_is_api = 'true';
  }

  getApiInfo(apiIdFromRoute: Number) {
    this.flag_is_api = 'true';
    this.dataService
      .getDetailedAPI(apiIdFromRoute)
      .subscribe((response) => {
        this.dataSource = response;
      });
  }

  getEndpoint(endpoint: string) {
    this.flag_is_api = 'false';
  }

  validateUrl(text: string) {
    // tslint:disable-next-line: max-line-length
    const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return urlRegExp.test(text);
  }

  sendRequest() {
    this.endpointError = '';
    this.responseData = '';
    this.responseError = ''; 

    if (!this.validateUrl(this.endpointURL)) {
      this.endpointError = 'Ingresa un URL válido';
      return;
    }

    this.loadingState = true;
    switch (this.selectedRequestMethod) {
      case 'GET': {
        this.dataService.sendGetRequest(
          this.endpointURL
        ).subscribe(
          data => {
            this.loadingState = false;
            this.responseData = JSON.stringify(data, undefined, 4);
          },
          error => {
            this.loadingState = false;
            this.responseError = JSON.stringify(error, undefined, 4);
          }
        );
        break;
      }
    }

    this.selectedRequestMethod = 'GET';
    this.endpointError = '';
  }
}
