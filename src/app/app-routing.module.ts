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
import {EmptysectionComponent} from "./store_keeper/sections/emptysection/emptysection.component";
import {LoardingsectionComponent} from "./store_keeper/sections/loardingsection/loardingsection.component";
import {WashingsectionComponent} from "./store_keeper/sections/washingsection/washingsection.component";
import {MilkproductionsectionComponent} from "./store_keeper/sections/milkproductionsection/milkproductionsection.component";
import {ContainerstoremanagerComponent} from "./production_manager/containerstoremanager/containerstoremanager.component";
import {
  DashboardstoremanagerComponent
} from "./production_manager/dashboardstoremanager/dashboardstoremanager.component";
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
      { path: '', redirectTo: 'dashboardstore', pathMatch: 'full' },

      {path:'dashboardstore',component: DashboardstoreComponent},
      {path:'emptysection',component: EmptysectionComponent},
      {path:'loardingsection',component: LoardingsectionComponent},
      {path:'washingsection',component: WashingsectionComponent},
      {path:'milkproductionsection',component: MilkproductionsectionComponent},
    ]},
  {path:'productionmanager',component:ContainerstoremanagerComponent,children:[
      { path: '', redirectTo: 'dashboardstoremanager', pathMatch: 'full' },

      {path:'dashboardstoremanager',component: DashboardstoremanagerComponent},
    ]},



  //{ path: '', redirectTo: 'container', pathMatch: 'full' ,
  // Other routes if needed


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
