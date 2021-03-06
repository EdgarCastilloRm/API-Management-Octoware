import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared/shared.module';
import { AngularMaterialModule } from './views/angular-materials/angular-materials.module';
import { CatalogueModule } from './views/catalogue/catalogue.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { LoginModule } from './views/login/login.module';
import { DetailedApiModule } from './views/detailed-api/detailed-api.module';
import { EditModeModule } from './views/edit-mode/edit-mode.module';
import { EditApiModule } from './views/edit-api/edit-api.module';
import { UserManagementModule } from './views/user-management/user-management.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoginModule,
    CatalogueModule,
    DashboardModule,
    AngularMaterialModule,
    EditModeModule,
    SharedModule,
    DetailedApiModule,
    EditApiModule,
    UserManagementModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
