import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './hr_officer/header/header.component';
import { SidenavComponent } from './hr_officer/sidenav/sidenav.component';
import { DashboardComponent } from './hr_officer/dashboard/dashboard.component';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
// Import Angular Material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { Notificationbar } from './hr_officer/notificationbar/notificationbar';
import { NotificationComponent } from './hr_officer/notification/notification.component';
import { GeneratesalaryComponent } from './hr_officer/generatesalary/generatesalary.component';
import { SalaryAdvanceComponent } from './hr_manager/salary-advance/salary-advance.component';
import { AddLoanComponent } from './hr_manager/add-loan/add-loan.component';
import { ModelLoanComponent } from './hr_manager/model-loan/model-loan.component';
import { UpdateLoanComponent } from './hr_manager/update-loan/update-loan.component';
import { UpdateAdvanceComponent } from './hr_manager/update-advance/update-advance.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule,provideHttpClient, withFetch } from '@angular/common/http';
import { DashboardstoreComponent } from './store_keeper/dashboardstore/dashboardstore.component';
import { SidemenubarstoreComponent } from './store_keeper/sidemenubarstore/sidemenubarstore.component';
import { NotificationcomComponent } from './common/notificationcom/notificationcom.component';
import { ProductioncricleComponent } from './common/productioncricle/productioncricle.component';
import { ContainerstoreComponent } from './store_keeper/containerstore/containerstore.component';
import { EmptysectionComponent } from './store_keeper/sections/emptysection/emptysection.component';
import { WashingsectionComponent } from './store_keeper/sections/washingsection/washingsection.component';
import { MilkproductionsectionComponent } from './store_keeper/sections/milkproductionsection/milkproductionsection.component';
import { LoardingsectionComponent } from './store_keeper/sections/loardingsection/loardingsection.component';
import { ContainerstoremanagerComponent } from './production_manager/containerstoremanager/containerstoremanager.component';
import { DashboardstoremanagerComponent } from './production_manager/dashboardstoremanager/dashboardstoremanager.component';
import { HeaderstoremanagerComponent } from './production_manager/headerstoremanager/headerstoremanager.component';
import { SidemenubarstoremanagerComponent } from './production_manager/sidemenubarstoremanager/sidemenubarstoremanager.component';
import { ManageagentComponent } from './production_manager/productionsections/manageagent/manageagent.component';
import { ManageissueComponent } from './production_manager/productionsections/manageissue/manageissue.component';
import { ManagebottlestockComponent } from './production_manager/productionsections/managebottlestock/managebottlestock.component';
import { ManagebottledamageComponent } from './production_manager/productionsections/managebottledamage/managebottledamage.component';
import { ManageproductionreportsComponent } from './production_manager/productionsections/manageproductionreports/manageproductionreports.component';
import {User} from "./model/usermodel";
import { ManageuserprofileComponent } from './common/manageuserprofile/manageuserprofile.component';
import { ProductionmanageruserprofileComponent } from './production_manager/productionsections/productionmanageruserprofile/productionmanageruserprofile.component';
import { StorekeeperuserprfileComponent } from './store_keeper/sections/storekeeperuserprfile/storekeeperuserprfile.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { DailyProductionReportComponent } from './production_manager/productionsections/manageproductionreports/daily-report/daily-production-report.component';
import { WeeklyProductionReportComponent } from './production_manager/productionsections/manageproductionreports/weekly-report/weekly-production-report.component';
import { MonthlyProductionReportComponent } from './production_manager/productionsections/manageproductionreports/monthly-report/monthly-production-report.component';
import { AgentDailyReportComponent } from './production_manager/productionsections/manageproductionreports/agent-daily-report/agent-daily-report.component';
import { AgentWeeklyReportComponent } from './production_manager/productionsections/manageproductionreports/agent-weekly-report/agent-weekly-report.component';
import { AgentMonthlyReportComponent } from './production_manager/productionsections/manageproductionreports/agent-monthly-report/agent-monthly-report.component';
import {CanvasJSAngularStockChartsModule} from "@canvasjs/angular-stockcharts";
import {LeaveApproveComponent} from "./hr_manager/leave-approve/leave-approve.component";
import {ManageUserComponent} from "./hr_manager/manage-user/manage-user.component";
import {MedicalApproveComponent} from "./hr_manager/medical-approve/medical-approve.component";
import {EmpDetailsComponent} from "./hr_manager/emp-details/emp-details.component";
import { HrmManageProfileComponent } from './hr_manager/hrm-manage-profile/hrm-manage-profile.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MailBoxComponent } from './common/mail-box/mail-box.component';
import { ChatBoxComponent } from './common/chat-box/chat-box.component';
import {EmployeeMedical} from "./model/employeeMedical";
import {EmployeeLeave} from "./model/employeeLeave";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {BaseChartDirective} from "ng2-charts";
import { UpdatePositionComponent } from './hr_manager/update-position/update-position.component';
import { DepartmentandsectionComponent } from './hr_manager/departmentandsection/departmentandsection.component';
import { UpdatedepartmentComponent } from './hr_manager/updatedepartment/updatedepartment.component';
import { UpdatesectionComponent } from './hr_manager/updatesection/updatesection.component';

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
    NotificationComponent,
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
    ModelLoanComponent,
    UpdateLoanComponent,
    UpdateAdvanceComponent,
    SidemenubarstoreComponent,
    NotificationcomComponent,
    ProductioncricleComponent,
    ContainerstoreComponent,
    DashboardstoreComponent,
    EmptysectionComponent,
    WashingsectionComponent,
    MilkproductionsectionComponent,
    LoardingsectionComponent,
    ContainerstoremanagerComponent,
    DashboardstoremanagerComponent,
    HeaderstoremanagerComponent,
    SidemenubarstoremanagerComponent,
    ManageagentComponent,
    ManageissueComponent,
    ManagebottlestockComponent,
    ManagebottledamageComponent,
    ManageproductionreportsComponent,
    ManageuserprofileComponent,
    ProductionmanageruserprofileComponent,
    StorekeeperuserprfileComponent,
    DailyProductionReportComponent,
    WeeklyProductionReportComponent,
    MonthlyProductionReportComponent,
    AgentDailyReportComponent,
    AgentWeeklyReportComponent,
    AgentMonthlyReportComponent,
    EmpDetailsComponent,
    MedicalApproveComponent,
    ManageUserComponent,
    LeaveApproveComponent,
    HrmManageProfileComponent,
    MailBoxComponent,
    ChatBoxComponent,
    UpdatePositionComponent,
    DepartmentandsectionComponent,
    UpdatedepartmentComponent,
    UpdatesectionComponent,


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
        HttpClientModule,
        MatTableModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        MatTab,
        MatTabGroup,
        FormsModule,
        CanvasJSAngularStockChartsModule,
        MatDialogModule,
        MatDatepickerInput,
        MatProgressSpinner,
        BaseChartDirective,
      NgxPaginationModule


    ],


  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    User,
    EmployeeMedical,
    EmployeeLeave
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
