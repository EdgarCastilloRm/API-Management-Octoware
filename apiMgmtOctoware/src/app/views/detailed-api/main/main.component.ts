import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavApiId } from 'src/app/models/basicInfoUser';
import { Categories, DetailedAPI, Endpoints, Params, SpecificEndpoint, Resp, Header } from 'src/app/models/detailedApiData';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  favButton!: FavApiId;
  endpointURL: string;
  extras: string;
  selectedRequestMethod: string;
  responseData: any;
  responseError: any;
  endpointError: string;
  loadingState: boolean;
  input!:any[];
  headers: Header[] = [];
  body!: any;
  dataSource!: DetailedAPI;
  dataSource2!:any;
  categories!: Categories[];
  endpoints!: Endpoints[];
  params: Params[] = [];
  pathParams: Params[] = [];
  queryParams: Params[] = [];
  backup: Params[] = [];
  responses!: Resp[]
  flag_is_api!: string;
  text!:string;

  displayedColumns: string[] = ['path','query'];

  userData = this.dataService.getJsonValue('currentUser');

  selectedEndpoint!: SpecificEndpoint;

  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.endpointURL = '';
    this.selectedRequestMethod = '';
    this.endpointError = '';
    this.extras = '';
    this.loadingState = false;
  }



  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apiIdFromRoute = Number(routeParams.get('id_api'));
    var obj={
      id_api: apiIdFromRoute
    }
    this.getApiInfo(apiIdFromRoute);
    this.getCategoriesInfo(apiIdFromRoute);
    this.getEndpoints();
    this.getFavs(obj);
  }

  getApiInfo(apiIdFromRoute: Number) {
    var obj={
      id_api: apiIdFromRoute
    }
    this.getFavs(obj)
    this.dataService
      .getDetailedAPI(apiIdFromRoute)
      .subscribe((response) => {
        this.dataSource = response;
        if(this.dataSource != null){
          this.flag_is_api = 'true';
        }
      });
  }

  toggleSelected(){
    const routeParams = this.route.snapshot.paramMap;
    const id_api = Number(routeParams.get('id_api'));
    var body = {
      id_usr: this.userData.id_usr,
      id_api: id_api
    };
    if (this.favButton == null){
    //mandar el post
      this.postFavs(body);
      
    }else{
      //mandar el put
      this.putFavs(body);
    }
  }

  getCategoriesInfo(apiIdFromRoute: Number){
    this.dataService.getCategoriesByID(apiIdFromRoute).subscribe((response) => {
      this.categories = response;
    });
  }

  getEndpoints(){
    this.dataService.getEndpointsByCat().subscribe((response) => {
      this.endpoints = response;
    });
  }

  getEndpoint(id_end: Number) {
    this.selected = false;
    this.getParams(id_end);
    this.getResponses(id_end);
    this.dataService.getSpecificEndpointByID(id_end).subscribe({
      next: (response) => {
      this.selectedEndpoint = response;
      this.selectedRequestMethod = this.selectedEndpoint.tipo_end;
      this.endpointURL = this.selectedEndpoint.url_end;
      this.queryParams = [];
      this.pathParams = [];
      this.responseData = null;
      this.responseError = null;
      for (let index = 0; index < this.params.length; index++) {
        if(this.params[index].query==true){
          this.queryParams.push(this.params[index]);
        }else{
          this.pathParams.push(this.params[index]);
        }
      }
      this.body = response.body;
      this.backup = this.queryParams;
      this.input = new Array(this.queryParams.length);
      this.flag_is_api = 'false';
    }
    });
  }

  getFavs(body:any){
    var obj = {
      id_usr: this.userData.id_usr,
      id_api: body.id_api
    };
    this.dataService.getFavById(obj).subscribe({
      next: (res) =>{
        if (res != null){
          if(res.disponibilidad == true){
            this.selected = true;
          }else{
            this.selected = false;
          }
        }

        this.favButton = res;
      }
    })
  }

  postFavs(body: any){
    this.dataService.postFav(body).subscribe({
      next: (res) => {
        this.getFavs(body);
      }
    })
  }

  putFavs(body: any){
    this.dataService.putFav(body).subscribe({
      next: (res) =>{
        this.getFavs(body);
      }
    })
  }

  getParams(id_end: Number){
    this.dataService.getEndpointParams(id_end).subscribe((response) => {
      this.params = response;
      this.dataSource2 = (response);
    });
  }

  getResponses(id_end: Number){
    this.dataService.getEndpointResponse(id_end).subscribe((response) => {
      this.responses = response;
    });
  }

  validateUrl(text: string) {
    // tslint:disable-next-line: max-line-length
    const urlRegExp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return urlRegExp.test(text);
  }

  addHeader(){
    this.headers.push({
      id : this.headers.length + 1,
      nombre: "",
      key: ""

    });
  }

  removeHeader(i : number) {
    this.headers.splice(i,1);
  }

  sendRequest() {
    this.endpointError = '';
    this.responseData = '';
    this.responseError = ''; 

    if (!this.validateUrl(this.endpointURL)) {
      console.log("hay un error");
    }

    this.loadingState = true;

    switch (this.selectedRequestMethod) {
      case 'GET': {
        this.dataService.sendGetRequest(
          this.endpointURL, this.queryParams, this.headers, this.input
        ).subscribe({
          next: (res) => {
            this.loadingState = false;
            this.responseData = JSON.stringify(res, undefined, 4);
            this.queryParams = this.backup;
          },
          error: (err) => {
            this.loadingState = false;
            this.responseError = JSON.stringify(err, undefined, 4);
            this.queryParams = this.backup;
          }
        }
        );
        break;
      }

      
      case 'POST': {
        this.dataService.sendPostRequest(
          this.endpointURL, this.queryParams, this.headers, this.input, this.body
        ).subscribe({
          next: (res) => {
            this.loadingState = false;
            this.responseData = JSON.stringify(res, undefined, 4);
            this.queryParams = this.backup;
          },
          error: (err) => {
            this.loadingState = false;
            this.responseError = JSON.stringify(err, undefined, 4);
            this.queryParams = this.backup;;
          }
        }
        );
        break;
      }

      case 'PUT': {
        this.dataService.sendPutRequest(
          this.endpointURL, this.queryParams, this.headers, this.input, this.body
        ).subscribe({
          next: (res) => {
            this.loadingState = false;
            this.responseData = JSON.stringify(res, undefined, 4);
            this.queryParams = this.backup;
          },
          error: (err) => {
            this.loadingState = false;
            this.responseError = JSON.stringify(err, undefined, 4);
            this.queryParams = this.backup;;
          }
        }
        );
        break;
      }

      case 'DELETE': {
        this.dataService.sendDeleteRequest(
          this.endpointURL, this.queryParams, this.headers, this.input
        ).subscribe({
          next: (res) => {
            this.loadingState = false;
            this.responseData = JSON.stringify(res, undefined, 4);
            this.queryParams = this.backup;
          },
          error: (err) => {
            this.loadingState = false;
            this.responseError = JSON.stringify(err, undefined, 4);
            this.queryParams = this.backup;;
          }
        }
        );
        break;
      }
    }
    this.endpointError = '';
  }
}
