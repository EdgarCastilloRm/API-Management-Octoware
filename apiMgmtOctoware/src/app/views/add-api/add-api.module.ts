import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddApiComponent } from './add-api/add-api.component';
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

@NgModule({
  declarations: [
    AddApiComponent
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
    MatFormFieldModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddAPiModule { }
