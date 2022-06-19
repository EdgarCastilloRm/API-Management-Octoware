import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash'
import { FavApiUsr } from 'src/app/models/basicInfoUser';
import { Router } from '@angular/router';
import { TableData } from 'src/app/models/catalogTableData';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ngOnInit(): void {

  }
  
}
