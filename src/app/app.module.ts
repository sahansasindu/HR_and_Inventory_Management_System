import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './hr_officer/header/header.component';
import { SidenavComponent } from './hr_officer/sidenav/sidenav.component';
import { DashboardComponent } from './hr_officer/dashboard/dashboard.component';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './common/login/login.component';
import { ContainerComponent } from './hr_officer/container/container.component';
import { ResetpwordComponent } from './common/resetpword/resetpword.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import { DashboardCardsection } from './hr_officer/dashboard-cardsection/dashboard-cardsection';
import { PiechartComponent } from './hr_officer/piechart/piechart.component';
import { SignupComponent } from './common/signup/signup.component';
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import { HrmHeaderComponent } from './hr_manager/hrm-header/hrm-header.component';
import { HrmSidenavComponent } from './hr_manager/hrm-sidenav/hrm-sidenav.component';
import { EmployeeSalaryComponent } from './hr_manager/employee-salary/employee-salary.component';
import { AddBasicSalary } from './hr_manager/add-basic-salary/add-basic-salary';


import { ModelDeductionformComponent } from './hr_manager/model-deductionform/model-deductionform.component';
import { AllowancesComponent }from './hr_manager/allowances/allowances.component';
import {DeductionComponent} from './hr_manager/deduction/deduction.component';
import { AddDeductionComponent } from './hr_manager/add-deduction/add-deduction.component';
import { AddAllowancesComponent } from './hr_manager/add-allowances/add-allowances.component';
import { ModelAllowancesformComponent } from './hr_manager/model-allowancesform/model-allowancesform.component';
import { UpdateDeductiondetailsComponent } from './hr_manager/update-deductiondetails/update-deductiondetails.component';
import { UpdateAllowancedetailsComponent } from './hr_manager/update-allowancedetails/update-allowancedetails.component'

import {ModelBasicsalaryformComponent}from './hr_manager/model-basicsalaryform/model-basicsalaryform.component';
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
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepicker, MatDatepickerToggle} from "@angular/material/datepicker";
import { Notificationbar } from './hr_officer/notificationbar/notificationbar';
import { NotificationComponent } from './hr_officer/notification/notification.component';
import { GeneratesalaryComponent } from './hr_officer/generatesalary/generatesalary.component';
import { SalaryAdvanceComponent } from './hr_manager/salary-advance/salary-advance.component';
import { AddLoanComponent } from './hr_manager/add-loan/add-loan.component';














@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    LoginComponent,
    ContainerComponent,
    ResetpwordComponent,
    DashboardCardsection,
    PiechartComponent,
    SignupComponent,
    HrmContainerComponent,
    HrmDashboardComponent,
    HrmHeaderComponent,
    HrmSidenavComponent,
    EmployeeSalaryComponent,
    AddBasicSalary,
    ModelDeductionformComponent,
    AllowancesComponent,
    DeductionComponent,
    AddDeductionComponent,
    AddAllowancesComponent,
    ModelAllowancesformComponent,
    UpdateDeductiondetailsComponent,
    UpdateAllowancedetailsComponent,
    ModelBasicsalaryformComponent,
    AddSalarydetailsComponent,
    UpdateSalarydetailsComponent,
    LoanComponent,
    AddAdvanceComponent,
    AddNewEmployeeComponent,
    ViewEmployeeComponent,
    AddMedicalComponent,
    EmployeeAttendanceComponent,
    EmployeeLeaveComponent,
    ManageAccountComponent,
    Notificationbar,
    NotificationComponent,
    GeneratesalaryComponent,
    SalaryAdvanceComponent,
    AddLoanComponent,









  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDrawerContainer,
    BrowserAnimationsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatBadgeModule,
    MatCardModule,
    MatCardModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatDatepicker,


  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
