import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./hr_officer/dashboard/dashboard.component";
import{ContainerComponent} from "./hr_officer/container/container.component";
import {LoginComponent} from "./common/login/login.component";
import {SignupComponent}from "./common/signup/signup.component";
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import { EmployeeSalaryComponent  } from './hr_manager/employee-salary/employee-salary.component';
import { AddBasicSalary } from './hr_manager/add-basic-salary/add-basic-salary';
import { AllowancesComponent }from './hr_manager/allowances/allowances.component';
import {DeductionComponent} from './hr_manager/deduction/deduction.component';
import { AddDeductionComponent } from './hr_manager/add-deduction/add-deduction.component';
import { AddAllowancesComponent } from './hr_manager/add-allowances/add-allowances.component';
import { UpdateAllowancedetailsComponent } from './hr_manager/update-allowancedetails/update-allowancedetails.component'
import { UpdateDeductiondetailsComponent } from './hr_manager/update-deductiondetails/update-deductiondetails.component';
import {AddSalarydetailsComponent}from './hr_manager/add-salarydetails/add-salarydetails.component';
import {UpdateSalarydetailsComponent}from './hr_manager/update-salarydetails/update-salarydetails.component';
import { LoanComponent } from './hr_manager/loan/loan.component';
import { AddAdvanceComponent } from './hr_officer/add-advance/add-advance.component';
import { AddNewEmployeeComponent } from './hr_officer/add-new-employee/add-new-employee.component';
import { ViewEmployeeComponent } from './hr_officer/view-employee/view-employee.component';
import { AddMedicalComponent } from './hr_officer/add-medical/add-medical.component';
import { EmployeeAttendanceComponent } from './hr_officer/employee-attendance/employee-attendance.component';
import { EmployeeLeaveComponent } from './hr_officer/employee-leave/employee-leave.component';
import { ManageAccountComponent } from './hr_officer/manage-account/manage-account.component';
import { GeneratesalaryComponent } from './hr_officer/generatesalary/generatesalary.component';
import { SalaryAdvanceComponent } from './hr_manager/salary-advance/salary-advance.component';
import { AddLoanComponent } from './hr_manager/add-loan/add-loan.component';
import { UpdateLoanComponent } from './hr_manager/update-loan/update-loan.component';
import { UpdateAdvanceComponent } from './hr_manager/update-advance/update-advance.component';
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
import {LeaveApproveComponent} from "./hr_manager/leave-approve/leave-approve.component";
import {ManageUserComponent} from "./hr_manager/manage-user/manage-user.component";
import {MedicalApproveComponent} from "./hr_manager/medical-approve/medical-approve.component";
import {EmpDetailsComponent} from "./hr_manager/emp-details/emp-details.component";
import {HrmManageProfileComponent} from "./hr_manager/hrm-manage-profile/hrm-manage-profile.component";
import {MailBoxComponent} from "./common/mail-box/mail-box.component";
import {ChatBoxComponent} from "./common/chat-box/chat-box.component";
import {ResetpwordComponent} from "./common/resetpword/resetpword.component";
import {UpdatePositionComponent} from "./hr_manager/update-position/update-position.component";
import {DepartmentandsectionComponent} from "./hr_manager/departmentandsection/departmentandsection.component";
import {EmployeeattendacehrComponent} from "./hr_manager/employeeattendacehr/employeeattendacehr.component";
import {EmployeedailypayrollComponent} from "./hr_manager/employeedailypayroll/employeedailypayroll.component";
import {EmployeemonthlysalaryComponent} from "./hr_manager/employeemonthlysalary/employeemonthlysalary.component";
import {SalaryReportComponent}from "./hr_officer/salary-report/salary-report.component";


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'passwordreset',component:ResetpwordComponent},


  { path: 'container', component: ContainerComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-employee', component:  AddNewEmployeeComponent },
      { path: 'viewemployee', component:  ViewEmployeeComponent },
      { path: 'employeemedical', component:  AddMedicalComponent },
      { path: 'addattendance', component:  EmployeeAttendanceComponent },
      { path: 'employeeleave', component:  EmployeeLeaveComponent },
      { path: 'manageacount', component:  ManageAccountComponent },
      { path: 'addadvance', component:  AddAdvanceComponent  },
      { path: 'generetesalary', component: GeneratesalaryComponent  },
      { path: 'mailboxNavigate', component: MailBoxComponent},
      { path: 'chatboxNavigate', component: ChatBoxComponent},
      { path: 'monthlysalary', component: SalaryReportComponent},
    //  { path: 'home', component: HomeComponent }, production_copy_dilshan

    ]},

  { path: 'hrmcontainer', component: HrmContainerComponent, children: [
      { path: '', redirectTo: 'hrmdashboard', pathMatch: 'full' },

      { path: 'hrmdashboard', component: HrmDashboardComponent },
      {path:"manage-promotion",component: UpdatePositionComponent},
      { path: 'esc', component: EmployeeSalaryComponent},
      { path: 'hrm-dashboard', component: HrmDashboardComponent },
      { path: 'add-employee', component:  AddNewEmployeeComponent },
      {path:'emp-details',component: EmpDetailsComponent},
      {path:'employee-attendance-HR-manager',component: EmployeeattendacehrComponent},
      {path:'medical-approve',component: MedicalApproveComponent},
      {path:'manage-user',component: ManageUserComponent},
      {path:'HrmManageProfile',component: HrmManageProfileComponent},
      {path:'leave-approve',component: LeaveApproveComponent},
      { path: 'mailboxNavigate', component: MailBoxComponent},
      { path: 'chatboxNavigate', component: ChatBoxComponent},
      { path: 'chatboxNavigate', component: ChatBoxComponent},
      { path: 'departmentandsection', component: DepartmentandsectionComponent},

    ]},
    {path:'storekeeper',component:ContainerstoreComponent,children:[
      { path: '', redirectTo: 'dashboardstore', pathMatch: 'full' },

      {path:'dashboardstore',component: DashboardstoreComponent},
      {path:'emptysection',component: EmptysectionComponent},
      {path:'loardingsection',component: LoardingsectionComponent},
      {path:'washingsection',component: WashingsectionComponent},
      {path:'milkproductionsection',component: MilkproductionsectionComponent},
      {path:'storekeeperUserprofile',component: StorekeeperuserprfileComponent},
        { path: 'mailboxNavigate', component: MailBoxComponent},
        { path: 'chatboxNavigate', component: ChatBoxComponent},
    ]},

  {path:'productionmanager',component:ContainerstoremanagerComponent,children:[
      { path: '', redirectTo: 'dashboardstoremanager', pathMatch: 'full' },

      {path:'dashboardstoremanager',component: DashboardstoremanagerComponent},
      {path:'manageagent',component: ManageagentComponent},
      {path:'manageissues',component: ManageissueComponent},
      {path:'managebottlestock',component: ManagebottlestockComponent},
      {path:'managereportsproduction',component: ManageproductionreportsComponent},
      {path:'productionmanagerUserprofile',component: ProductionmanageruserprofileComponent},
      {path:'managebottledamage',component: ManagebottledamageComponent},
      { path: 'mailboxNavigate', component: MailBoxComponent},
      { path: 'chatboxNavigate', component: ChatBoxComponent},

    ]},

  { path: 'mdc', component: AddBasicSalary },
  { path: 'deduction', component: DeductionComponent},
  { path: 'allowance', component:  AllowancesComponent},
  { path: 'add-deduction', component: AddDeductionComponent },
  { path: 'add-allowances', component: AddAllowancesComponent },
  { path: 'UpdateAllowance/:id', component: UpdateAllowancedetailsComponent},
  { path: 'deductionupdate/:id', component: UpdateDeductiondetailsComponent },

  { path: 'addSalary', component: AddSalarydetailsComponent},
  { path: 'updateSalary/:id', component: UpdateSalarydetailsComponent},
  { path: 'salaryadvance', component:  SalaryAdvanceComponent},

  { path: 'loan', component: LoanComponent},
  { path: 'add-loan', component: AddLoanComponent},
  { path: 'update-loan/:id', component: UpdateLoanComponent},
  { path: 'update-advance/:id', component: UpdateAdvanceComponent},
  { path: 'dailypayroll', component: EmployeedailypayrollComponent},
  { path: 'employeemonthlysalary', component: EmployeemonthlysalaryComponent},



  // Other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
