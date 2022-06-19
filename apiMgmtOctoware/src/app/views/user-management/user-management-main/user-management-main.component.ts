import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AllUserInfo } from 'src/app/models/basicInfoUser';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';

@Component({
  selector: 'app-user-management-main',
  templateUrl: './user-management-main.component.html',
  styleUrls: ['./user-management-main.component.css']
})
export class UserManagementMainComponent implements OnInit {
  displayedColumns: string[] = ['nombre_usr', 'email', 'id_tipo_usr', 'active', 'actions'];
  dataSource!: MatTableDataSource<AllUserInfo>;
  _dataSource!: MatTableDataSource<AllUserInfo>;
  datos!: AllUserInfo[];

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  constructor(private api: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  openEditPopUp(id : number) {
    this.dialog.open(EditPopupComponent,{
      restoreFocus: false,
      data: {id_usr: id}
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllUsers();
      }
    });
  }

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this._dataSource = new MatTableDataSource(res);
        this.datos = res;
      },
      error :  (err) => {
        alert("Error while fetching data.");
      }
    });
  }

  logicUserDelete(id: number){
    this.api.logicUserDeleteByID(id).subscribe({
      next:(res)=>{
        this.Toast.fire({
          icon: 'success',
          title: 'User was disabled successfully.',
          color: '#FFFFFF',
          background: '#329B22',
          iconColor: '#FFFFFF'
        })
        this.getAllUsers();
      },
      error :  (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Error while disabling User.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    });
  }

  logicUserActivation(id: number){
    this.api.logicUserActivationByID(id).subscribe({
      next:(res)=>{
        this.Toast.fire({
          icon: 'success',
          title: 'User was enabled successfully.',
          color: '#FFFFFF',
          background: '#329B22',
          iconColor: '#FFFFFF'
        })
        this.getAllUsers();
      },
      error :  (err) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Error while enabling User.',
          color: '#FFFFFF',
          background: '#C71717',
          iconColor: '#FFFFFF'
        })
      }
    });
  }

  searchBar(event: Event){
    let filterValue = (event.target as HTMLInputElement).value;
    if(filterValue != '')
      this.dataSource.data  = this.dataSource.data.filter(fil => 
        fil.nombre_usr.toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1 ||
        fil.email.toLowerCase().indexOf(filterValue.trim().toLowerCase()) !== -1);
    if(filterValue === ''){
      this.dataSource.data = this._dataSource.data;
    }
  }

  unSearch(){
    this.dataSource.data = this._dataSource.data
  }


}
