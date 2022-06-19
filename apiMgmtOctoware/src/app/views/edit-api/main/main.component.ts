import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DetailedAPI, Categories, Endpoints, Params, SpecificEndpoint, Resp } from 'src/app/models/detailedApiData';
import { DataService } from 'src/app/services/data.service';
import { NewMethodComponent } from 'src/app/shared/shared/addComps/new-method/new-method.component';
import { DeleteCatComponent } from 'src/app/shared/shared/deleteComps/delete-cat/delete-cat.component';
import { DeleteMethodComponent } from 'src/app/shared/shared/deleteComps/delete-method/delete-method.component';
import { EditCategoryComponent } from 'src/app/shared/shared/edit-category/edit-category.component';
import { NewAPIComponent } from 'src/app/shared/shared/new-api/new-api.component';

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
  params!: Params[];
  pathParams: Params[] = [];
  queryParams: Params[] = [];
  responses!: Resp[];
  flag_is_api!: string;
  apiIdFromRoute! : Number;

  selectedEndpoint!: SpecificEndpoint;

  constructor(private dataService: DataService, private route: ActivatedRoute, private dialog: MatDialog) {
    this.endpointURL = '';
    this.selectedRequestMethod = 'GET';
    this.requestMethods = ['GET', 'POST', 'DELETE', 'PUT'];
    this.endpointError = '';
    this.loadingState = false;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.apiIdFromRoute= Number(routeParams.get('id_api'));
    this.getApiInfo(this.apiIdFromRoute);
    this.getCategoriesInfo(this.apiIdFromRoute);
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
        this.queryParams = [];
        this.pathParams = [];
        for (let index = 0; index < this.params.length; index++) {
          if(this.params[index].query==true){
            this.queryParams.push(this.params[index]);
          }else{
            this.pathParams.push(this.params[index]);
          }
        }
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

  openEditGeneralAPI(api:any){
    this.dialog.open(NewAPIComponent,{
      restoreFocus: false,
      width:'40%',
      data: api
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getApiInfo(this.apiIdFromRoute);
        this.getCategoriesInfo(this.apiIdFromRoute);
        this.getEndpoints();
      }
    })
  }

  openCategoryDialog(){
    this.dialog.open(EditCategoryComponent, {
      restoreFocus: false,
      data: {
        route: this.route
      },
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getCategoriesInfo(this.apiIdFromRoute);
      }
    })
  }

  openEditCategory(category: any){
    this.dialog.open(EditCategoryComponent, {
      restoreFocus: false,
      data: {
        route: null,
        cat: category
      },
      width:'40%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getCategoriesInfo(this.apiIdFromRoute);
      }
    })
  }

  openDeleteCategory(id: Number){
    this.dialog.open(DeleteCatComponent, {
      restoreFocus: false,
      data: id,
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getApiInfo(this.apiIdFromRoute);
        this.getCategoriesInfo(this.apiIdFromRoute);
        this.getEndpoints();
      }
    })
  }

  openAddMethod(id:Number){
    this.dialog.open(NewMethodComponent, {
      restoreFocus: false,
      data: {
        edit: null,
        id_cat: id
      },
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getApiInfo(this.apiIdFromRoute);
        this.getCategoriesInfo(this.apiIdFromRoute);
        this.getEndpoints();
      }
    })
  }

  openEditMethod(endpoint: any){
    this.dialog.open(NewMethodComponent, {
      restoreFocus: false,
      data: {
        edit: endpoint,
        array: this.params,
        array2: this.responses,
        id_cat: null
      },
      width:'50%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getApiInfo(this.apiIdFromRoute);
        this.getCategoriesInfo(this.apiIdFromRoute);
        this.getEndpoints();
      }
    })
  }

  openDeleteMethod(id:Number){
    this.dialog.open(DeleteMethodComponent, {
      restoreFocus: false,
      data: id,
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getApiInfo(this.apiIdFromRoute);
        this.getCategoriesInfo(this.apiIdFromRoute);
        this.getEndpoints();
      }
    })
  }
}
