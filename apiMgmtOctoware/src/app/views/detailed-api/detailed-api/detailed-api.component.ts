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

  ngOnInit(): void {
  }
}
