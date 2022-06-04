import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';
import { FavApiId } from 'src/app/models/basicInfoUser';
import { Categories, DetailedAPI, Endpoints, Param, SpecificEndpoint, Resp } from 'src/app/models/detailedApiData';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  favButton!: FavApiId;
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

  userData = this.dataService.getJsonValue('currentUser');

  selectedEndpoint!: SpecificEndpoint;

  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<boolean>();

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
    this.getFavs(apiIdFromRoute);
  }

  getApiInfo(apiIdFromRoute: Number) {
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
      if (this.params != null && this.responses != null && this.selectedEndpoint != null){
        this.flag_is_api = 'false';
      }
    }
    });
  }

  getFavs(id_api: Number){
    var body = {
      id_usr: this.userData.id_usr,
      id_api: id_api
    };
    this.dataService.getFavById(body).subscribe({
      next: (res) =>{
        if (res != null){
          if(res.disponibilidad == true){
            this.selected = true;
          }else{
            this.selected = false;
          }
        }

        this.favButton = res;

        console.log("res:", res);
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
