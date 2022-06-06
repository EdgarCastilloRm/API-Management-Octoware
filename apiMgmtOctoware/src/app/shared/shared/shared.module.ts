import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/views/angular-materials/angular-materials.module';
import { NewAPIComponent } from './new-api/new-api.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DeleteAPIComponent } from './deleteComps/delete-api/delete-api.component';
import { DeleteCatComponent } from './deleteComps/delete-cat/delete-cat.component';
import { NewMethodComponent } from './addComps/new-method/new-method.component';
import { DeleteMethodComponent } from './deleteComps/delete-method/delete-method.component';



@NgModule({
  declarations: [
    NavbarComponent,
    Page404Component,
    NewAPIComponent,
    EditCategoryComponent,
    DeleteAPIComponent,
    DeleteCatComponent,
    NewMethodComponent,
    DeleteMethodComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FlexLayoutModule,
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
