import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedAPI } from 'src/app/models/detailedApiData';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detailed-api',
  templateUrl: './detailed-api.component.html',
  styleUrls: ['./detailed-api.component.css']
})
export class DetailedApiComponent implements OnInit {


  constructor(private _entriesService:DataService, private route: ActivatedRoute) { }

  categorias = ['Categoria1', 'Categoria2', 'Categoria3', 'Categoria4', 'Categoria5'];

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apiIdFromRoute = Number(routeParams.get('id_api'));
    this.getApiInfo(apiIdFromRoute);
  }

  apiData = <DetailedAPI>{};

  getApiInfo(apiIdFromRoute:Number){
    this._entriesService.getDetailedAPI(apiIdFromRoute).subscribe(
      response => {
        this.apiData = response;
      }
    );
  }
}
