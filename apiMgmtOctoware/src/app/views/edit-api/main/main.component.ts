import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedAPI, Categories, Endpoints, Param, SpecificEndpoint, Resp } from 'src/app/models/detailedApiData';
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
  categories!: Categories[];
  endpoints!: Endpoints[];
  params!: Param[];
  responses!: Resp[]
  flag_is_api!: string;

  selectedEndpoint!: SpecificEndpoint;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.endpointURL = '';
    this.selectedRequestMethod = 'GET';
    this.requestMethods = ['GET', 'POST', 'DELETE', 'PUT'];
    this.endpointError = '';
    this.loadingState = false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apiIdFromRoute = Number(routeParams.get('id_api'));
    this.getApiInfo(apiIdFromRoute);
    this.getCategoriesInfo(apiIdFromRoute);
    this.getEndpoints();
  }

  getApiInfo(apiIdFromRoute: Number){
    this.dataService
    .getDetailedAPI(apiIdFromRoute)
    .subscribe({
      next:(res)=>{
        this.dataSource = res;
        this.flag_is_api = 'true';
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getCategoriesInfo(apiIdFromRoute: Number){
    this.dataService
    .getCategoriesByID(apiIdFromRoute)
    .subscribe({
      next:(res)=>{
        this.categories = res;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getEndpoints(){
    this.dataService
    .getEndpointsByCat()
    .subscribe({
      next:(res)=>{
        this.endpoints = res;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getParams(id_end: Number){
    this.dataService
    .getEndpointParams(id_end)
    .subscribe({
      next:(res)=>{
        this.params = res;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getResponses(id_end: Number){
    this.dataService
    .getEndpointResponse(id_end)
    .subscribe({
      next:(res)=>{
        this.responses = res;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getEndpoint(id_end: Number){
    this.getParams(id_end);
    this.getResponses(id_end);
    this.dataService
    .getSpecificEndpointByID(id_end)
    .subscribe({
      next:(res)=>{
        this.selectedEndpoint = res;
        this.flag_is_api = 'false';
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
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
