import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./hr_officer/dashboard/dashboard.component";
import{ContainerComponent} from "./hr_officer/container/container.component";
import {LoginComponent} from "./common/login/login.component";
import {SignupComponent}from "./common/signup/signup.component";
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import {HrmLeaveAndMedicalComponent} from "./hr_manager/hrm-leave-and-medical/hrm-leave-and-medical.component";
import {HrmAttendanceComponent} from "./hr_manager/hrm-attendance/hrm-attendance.component";
import { HrmUpdateEmployeeDetailsComponent } from './hr_manager/hrm-update-employee-details/hrm-update-employee-details.component';
import { HrmUpdateFormComponent } from './hr_manager/hrm-update-form/hrm-update-form.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},


  { path: 'container', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'hrm-update-form/:id', component: HrmUpdateFormComponent },
    ]},


  { path: 'hrmcontainer', component: HrmContainerComponent, children: [
      { path: '', redirectTo: 'hrmdashboard', pathMatch: 'full' },
      { path: 'hrmdashboard', component: HrmDashboardComponent },
      { path: 'hrmupdateemployeedetails', component: HrmUpdateEmployeeDetailsComponent },
      { path: 'hrmattendance', component: HrmAttendanceComponent },
      { path: 'hrmleaveandmedical', component: HrmLeaveAndMedicalComponent },
    ]},

  { path: 'hrmupdateemployeedetails', component: HrmUpdateEmployeeDetailsComponent },
  { path: 'hrmupdateform/:id', component: HrmUpdateFormComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
