import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { Page404Component } from './page404/page404.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/views/angular-materials/angular-materials.module';



@NgModule({
  declarations: [
    NavbarComponent,
    Page404Component
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
