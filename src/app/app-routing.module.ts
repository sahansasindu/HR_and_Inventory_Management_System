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
import {DashboardstoremanagerComponent} from "./production_manager/dashboardstoremanager/dashboardstoremanager.component";
import {ManageagentComponent} from "./production_manager/productionsections/manageagent/manageagent.component";
import {
  ManagebottledamageComponent
} from "./production_manager/productionsections/managebottledamage/managebottledamage.component";
import {
  ManagebottlestockComponent
} from "./production_manager/productionsections/managebottlestock/managebottlestock.component";
import {ManageissueComponent} from "./production_manager/productionsections/manageissue/manageissue.component";
import {
  ManageproductionreportsComponent
} from "./production_manager/productionsections/manageproductionreports/manageproductionreports.component";
import {ManageuserprofileComponent} from "./common/manageuserprofile/manageuserprofile.component";
import {
  ProductionmanageruserprofileComponent
} from "./production_manager/productionsections/productionmanageruserprofile/productionmanageruserprofile.component";
import {
  StorekeeperuserprfileComponent
} from "./store_keeper/sections/storekeeperuserprfile/storekeeperuserprfile.component";
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
      {path:'storekeeperUserprofile',component: StorekeeperuserprfileComponent},
    ]},
  {path:'productionmanager',component:ContainerstoremanagerComponent,children:[
      { path: '', redirectTo: 'dashboardstoremanager', pathMatch: 'full' },

      {path:'dashboardstoremanager',component: DashboardstoremanagerComponent},
      {path:'manageagent',component: ManageagentComponent},
      {path:'manageissues',component: ManageissueComponent},
      {path:'managebottlestock',component: ManagebottlestockComponent},
      {path:'managebottledamage',component: ManagebottledamageComponent},
      {path:'managereportsproduction',component: ManageproductionreportsComponent},
      {path:'productionmanagerUserprofile',component: ProductionmanageruserprofileComponent},
    ]},



  //{ path: '', redirectTo: 'container', pathMatch: 'full' ,
  // Other routes if needed


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
