import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableData } from 'src/app/models/catalogTableData';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['nombre_api', 'disp_api', 'seguridad_api', 'ult_conexion_api', 'version_api'];
  dataSource!: MatTableDataSource<TableData>;
  _dataSource!: MatTableDataSource<TableData>;
  trueDataSource!: MatTableDataSource<TableData>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(private api:DataService, public router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAPIs();
  }

  getAllAPIs(){
    this.api.getAPIs()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.entries);
        this._dataSource = new MatTableDataSource(res.entries);
        this.trueDataSource = new MatTableDataSource(res.entries);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      },
      error: (err)=>{
        alert("Error while fetching data.");
      }
    })
  }

  searchBar(event: Event){
    let filterValue = (event.target as HTMLInputElement).value;
    if(filterValue != '')
      this.dataSource.data  = this.dataSource.data.filter(name => name.nombre_api.toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1);
    if(filterValue === ''){
      this.dataSource.data = this._dataSource.data;
    }
  }

  showDetailedProduct(data: TableData){
    const url = this.router.serializeUrl(this.router.createUrlTree(['apis/' + data.id_api]));
    window.open(url, '_blank');
  }

  selected = 'all';
  filterSecurity($event:any){
    this._dataSource.data = this.trueDataSource.data
    let filteredData = _.filter(this._dataSource.data,(item: any) =>{
      return item.seguridad_api == $event.value;
    })
    this.dataSource.data = filteredData;
    this._dataSource.data = filteredData;
    if($event.value.toLowerCase() === 'all'){
      this.dataSource.data = this.trueDataSource.data;
    }
  }

  unSearch(){
    this.dataSource.data = this._dataSource.data
  }
}
