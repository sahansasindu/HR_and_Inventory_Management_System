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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './common/login/login.component';
import { ContainerComponent } from './hr_officer/container/container.component';
import { ResetpwordComponent } from './common/resetpword/resetpword.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import { NotificationComponent } from './hr_officer/notification/notification.component';
import { PiechartComponent } from './hr_officer/piechart/piechart.component';
import { SignupComponent } from './common/signup/signup.component';
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import { HrmHeaderComponent } from './hr_manager/hrm-header/hrm-header.component';
import { HrmSidenavComponent } from './hr_manager/hrm-sidenav/hrm-sidenav.component';
import { EmpUpdateComponent } from './hr_manager/emp-update/emp-update.component';
import { LeaveMedicalComponent } from './hr_manager/leave-medical/leave-medical.component';
import { EmpDetailsComponent } from './hr_manager/emp-details/emp-details.component';
import { MedicalApproveComponent } from './hr_manager/medical-approve/medical-approve.component';
import { EmpAttendanceComponent } from './hr_manager/emp-attendance/emp-attendance.component';
import { ManageUserComponent } from './hr_manager/manage-user/manage-user.component';
import { LeaveApproveComponent } from './hr_manager/leave-approve/leave-approve.component';
import { EmpSalaryComponent } from './hr_manager/emp-salary/emp-salary.component';
import { ManageAccComponent } from './hr_manager/manage-acc/manage-acc.component';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    DashboardComponent,
    LoginComponent,
    ContainerComponent,
    ResetpwordComponent,
    NotificationComponent,
    PiechartComponent,
    SignupComponent,
    HrmContainerComponent,
    HrmDashboardComponent,
    HrmHeaderComponent,
    HrmSidenavComponent,
    EmpUpdateComponent,
    LeaveMedicalComponent,
    EmpDetailsComponent,
    MedicalApproveComponent,
    EmpAttendanceComponent,
    ManageUserComponent,
    LeaveApproveComponent,
    EmpSalaryComponent,
    ManageAccComponent,
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
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatFormFieldModule,
    MatSelect,
    MatOption,
    MatMomentDateModule,
    MatTableModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
