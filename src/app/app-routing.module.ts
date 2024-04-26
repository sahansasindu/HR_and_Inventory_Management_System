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









const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  { path: 'container', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'addemployee', component:  AddNewEmployeeComponent },
      { path: 'viewemployee', component:  ViewEmployeeComponent },
      { path: 'employeemedical', component:  AddMedicalComponent },
      { path: 'addattendance', component:  EmployeeAttendanceComponent },
      { path: 'employeeleave', component:  EmployeeLeaveComponent },
      { path: 'manageacount', component:  ManageAccountComponent },
      { path: 'addadvance', component:  AddAdvanceComponent  },
      { path: 'generetesalary', component: GeneratesalaryComponent  },


      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]},

  { path: 'hrmcontainer', component: HrmContainerComponent, children: [
      { path: 'hrmdashboard', component: HrmDashboardComponent },
      { path: 'esc', component: EmployeeSalaryComponent},


      { path: '', redirectTo: 'hrmdashboard', pathMatch: 'full' },
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










  // Other routes if needed
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
