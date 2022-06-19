import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';
import { MainComponent } from './main/main.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    AngularMaterialModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
