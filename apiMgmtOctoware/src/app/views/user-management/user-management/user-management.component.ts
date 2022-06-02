import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AllUserInfo, UserInfoResponse } from 'src/app/models/basicInfoUser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['nombre_usr', 'email', 'id_tipo_usr'];
  dataSource!: MatTableDataSource<AllUserInfo>;
  datos!: AllUserInfo[];

  constructor(private api: DataService) { }

  ngOnInit(): void {
    this.getAllUsers();
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
    })
  }
}
