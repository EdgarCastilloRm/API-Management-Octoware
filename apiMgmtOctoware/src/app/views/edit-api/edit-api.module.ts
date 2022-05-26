import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditApiComponent } from './edit-api/edit-api.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AngularMaterialModule } from '../angular-materials/angular-materials.module';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    EditApiComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule
  ]
})
export class EditApiModule { }
