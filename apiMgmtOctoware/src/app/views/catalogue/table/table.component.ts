import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TableData } from 'src/app/models/catalogTableData';
import { DataService } from 'src/app/services/data.service';
import * as _ from 'lodash'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private _entriesService:DataService, public router: Router) { }

  ngOnInit(): void {
    this.listar()
  }

  displayedColumns: string[] = ['nombre_api', 'tipo_disp', 'seguridad_api', 'ult_conexion_api', 'version_api'];
  dataSource = new MatTableDataSource<TableData>([]);
  _dataSource = new MatTableDataSource<TableData>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) matSort! : MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  listar() {
    this._entriesService.getEntries().subscribe(
      response => {
        console.log(response);
        if(response.count > 0){
          this.dataSource.data = response.entries;
          this._dataSource.data = response.entries
        }
      }
    );
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

  filterSecurity($event:any){
    let filteredData = _.filter(this._dataSource.data,(item: any) =>{
      return item.seguridad_api == $event.value;
    })
    this.dataSource.data = filteredData;
    if($event.value.toLowerCase() === 'all'){
      this.dataSource.data = this._dataSource.data;
    }
  }
}
