import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditModeComponent } from './edit-mode/edit-mode.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    EditModeComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class EditModeModule { }
