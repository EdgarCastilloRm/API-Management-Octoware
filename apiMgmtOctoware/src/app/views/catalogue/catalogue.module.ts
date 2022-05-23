import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';



@NgModule({
  declarations: [
    CatalogueComponent,
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
export class CatalogueModule { }
