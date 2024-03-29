import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./hr_officer/dashboard/dashboard.component";
import{ContainerComponent} from "./hr_officer/container/container.component";
import {LoginComponent} from "./common/login/login.component";
import {SignupComponent}from "./common/signup/signup.component";
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import {ContainerstoreComponent} from './store_keeper/containerstore/containerstore.component';
import {DashboardstoreComponent} from './store_keeper/dashboardstore/dashboardstore.component'
const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  { path: 'container', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
    //  { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]},

  { path: 'hrmcontainer', component: HrmContainerComponent, children: [
      { path: 'hrmdashboard', component: HrmDashboardComponent },
      //  { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'hrmdashboard', pathMatch: 'full' },
    ]},

  //set the paths storekeeper dashboard
  {path:'storekeeper',component:ContainerstoreComponent,children:[
      {path:'dashboardstore',component: DashboardstoreComponent},
      { path: '', redirectTo: 'dashboardstore', pathMatch: 'full' },
    ]},



  //{ path: '', redirectTo: 'container', pathMatch: 'full' },
  // Other routes if needed


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
