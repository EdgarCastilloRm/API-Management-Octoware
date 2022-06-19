import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { FavApiUsr } from 'src/app/models/basicInfoUser';
import { APICount, MethodCount, TableData } from 'src/app/models/catalogTableData';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  flag = false;

  reviewAPI! : TableData;

  apiCount: APICount = {
    apis: 0
  };

  methodCount: MethodCount[] = [];
  numberMethods: number[] = [];

  methodsData: ChartData<'pie'> = {
    labels: ['GET', 'POST', 'PUT', 'DELETE'],
    datasets: [
      {
        label: 'Methods', data: this.numberMethods,
        backgroundColor: ['#008000', '#1e90ff', '#daa520', '#ff0000'],
        hoverBackgroundColor: ['#008000', '#1e90ff', '#daa520', '#ff0000'],
        borderColor: ['#008000', '#1e90ff', '#daa520', '#ff0000'],
        hoverBorderColor: ['#008000', '#1e90ff', '#daa520', '#ff0000']
      },
    ],
  };

  chartOptions: ChartOptions = {
    aspectRatio: 1.5,
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: 'Number of Methods per type',
      },
      legend:{
        position: 'right'
      }
    },

  };
  
  displayedColumns: string[] = ['nombre_api', 'disp_api', 'ult_conexion_api', 'version_api'];
  dataSource!: MatTableDataSource<FavApiUsr>;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor( private dataService: DataService, private router:Router, private authService: SocialAuthService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  userData = this.dataService.getJsonValue('currentUser');

  ngOnInit(): void {
    this.getAllFavs();
    if(this.userData.status == false){
      this.authService.signOut();
      this.dataService.clearToken();
      this.router.navigate(['']);
      this.Toast.fire({
        icon: 'error',
        title: 'This account is disabled.',
        color: '#FFFFFF',
        background: '#C71717',
        iconColor: '#FFFFFF'
      })
    }
    this.getApis();
    this.getMethods();
    this.getAPIReview();
  }
  
  getAllFavs() {
    this.dataService.getFavs(this.userData.id_usr).subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.entries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getApis(){
    this.dataService.getApiCount().subscribe({
      next:(res)=>{
        this.apiCount = res;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getMethods(){
    this.dataService.getMethodCount().subscribe({
      next:(res)=>{
        this.methodCount = res;
        for (let index = 0; index < this.methodCount.length; index++) {
          const element = this.methodCount[index].methods;
          this.numberMethods.push(element)
        }
        this.flag = true;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  getAPIReview(){
    this.dataService.getRandomAPI().subscribe({
      next:(res)=>{
        this.reviewAPI = res;
        console.log(this.reviewAPI);
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  showDetailedProduct(data: FavApiUsr){
    this.router.navigate(['apis/' + data.id_api]);
  }

  showDetailedAPI(id_api: Number){
    this.router.navigate(['apis/' + id_api]);
  }


}
