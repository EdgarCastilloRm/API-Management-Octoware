import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';
import { MatTable, MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule
  ]
})
export class UserManagementModule { }
