import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./hr_officer/dashboard/dashboard.component";
import{ContainerComponent} from "./hr_officer/container/container.component";
import {LoginComponent} from "./common/login/login.component";
import {SignupComponent}from "./common/signup/signup.component";
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import {EmpUpdateComponent} from "./hr_manager/emp-update/emp-update.component";
import {LeaveMedicalComponent} from "./hr_manager/leave-medical/leave-medical.component";
import {EmpDetailsComponent} from "./hr_manager/emp-details/emp-details.component";
import {MedicalApproveComponent} from "./hr_manager/medical-approve/medical-approve.component";
import {EmpAttendanceComponent} from "./hr_manager/emp-attendance/emp-attendance.component";
import {ManageUserComponent} from "./hr_manager/manage-user/manage-user.component";
import {LeaveApproveComponent} from "./hr_manager/leave-approve/leave-approve.component";
import {EmpSalaryComponent} from "./hr_manager/emp-salary/emp-salary.component";
import {ManageAccComponent} from "./hr_manager/manage-acc/manage-acc.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},



  { path: 'container', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
    // { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]},

  { path: 'hrmcontainer', component: HrmContainerComponent, children: [

      { path: '', redirectTo: 'hrm-dashboard', pathMatch: 'full' },
      { path: 'hrm-dashboard', component: HrmDashboardComponent },
      { path: 'emp-update', component: EmpUpdateComponent },
      {path:'leave-medical',component: LeaveMedicalComponent},
      {path:'emp-details',component: EmpDetailsComponent},
      {path:'medical-approve',component: MedicalApproveComponent},
      {path:'emp-details',component: EmpDetailsComponent},
      {path:'emp-attendance',component: EmpAttendanceComponent},
      {path:'manage-user',component: ManageUserComponent},
      {path:'leave-approve',component: LeaveApproveComponent},
      {path:'emp-salary',component: EmpSalaryComponent},
      {path:'manage-acc',component: ManageAccComponent},
    ]},



  { path: '', redirectTo: 'container', pathMatch: 'full' },
  // Other routes if needed
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
