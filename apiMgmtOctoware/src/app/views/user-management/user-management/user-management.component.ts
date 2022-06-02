import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AllUserInfo, UserInfoResponse } from 'src/app/models/basicInfoUser';
import { DataService } from 'src/app/services/data.service';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['nombre_usr', 'email', 'id_tipo_usr', 'actions'];
  dataSource!: MatTableDataSource<AllUserInfo>;
  datos!: AllUserInfo[];

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
        this.datos = res;
      },
      error :  (err) => {
        alert("Error while fetching data.");
      }
    });
  }
}
