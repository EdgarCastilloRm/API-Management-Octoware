import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerGuard } from './guards/inner.guard';
import { LoginGuard } from './guards/login.guard';
import { Page404Component } from './shared/shared/page404/page404.component';
import { AddApiComponent } from './views/add-api/add-api/add-api.component';
import { CatalogueComponent } from './views/catalogue/catalogue/catalogue.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { DetailedApiComponent } from './views/detailed-api/detailed-api/detailed-api.component';
import { EditApiComponent } from './views/edit-api/edit-api/edit-api.component';
import { EditModeComponent } from './views/edit-mode/edit-mode/edit-mode.component';
import { LoginComponent } from './views/login/login/login.component';
import { UserManagementMainComponent } from './views/user-management/user-management-main/user-management-main.component';
import { UserManagementComponent } from './views/user-management/user-management/user-management.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'catalogue', component: CatalogueComponent, canActivate: [InnerGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [InnerGuard]},
  {path: 'apis/:id_api', component:DetailedApiComponent, canActivate: [InnerGuard]},
  {path: 'edit_mode', component:EditModeComponent, canActivate: [InnerGuard]},
  {path: 'edit/:id_api', component:EditApiComponent, canActivate: [InnerGuard]},
  {path: 'add_api', component: AddApiComponent, canActivate: [InnerGuard]},
  {path: 'gestion-de-usuarios', component: UserManagementMainComponent, canActivate: [InnerGuard]},
  {path: '**', pathMatch: 'full', component: Page404Component, canActivate: [InnerGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
