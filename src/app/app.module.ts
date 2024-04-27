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
import { NotificationComponent } from './hr_officer/notification/notification.component';
import { PiechartComponent } from './hr_officer/piechart/piechart.component';
import { SignupComponent } from './common/signup/signup.component';
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import { HrmHeaderComponent } from './hr_manager/hrm-header/hrm-header.component';
import { HrmSidenavComponent } from './hr_manager/hrm-sidenav/hrm-sidenav.component';
import { HrmNotificationComponent } from './hr_manager/hrm-notification/hrm-notification.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HrmLeaveAndMedicalComponent } from './hr_manager/hrm-leave-and-medical/hrm-leave-and-medical.component';
import {MatTableModule} from '@angular/material/table';
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import { HrmAttendanceComponent } from './hr_manager/hrm-attendance/hrm-attendance.component';
import { HrmUpdateEmployeeDetailsComponent } from './hr_manager/hrm-update-employee-details/hrm-update-employee-details.component';
import {MatPaginator} from "@angular/material/paginator";
import { DepartmentChartComponent } from './common/department-chart/department-chart.component';
import { EmployeeChartComponent } from './common/employee-chart/employee-chart.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HrmUpdateFormComponent } from './hr_manager/hrm-update-form/hrm-update-form.component';

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
    HrmNotificationComponent,
    HrmLeaveAndMedicalComponent,
    HrmAttendanceComponent,
    HrmUpdateEmployeeDetailsComponent,
    DepartmentChartComponent,
    EmployeeChartComponent,
    HrmUpdateFormComponent

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
    ScrollingModule,
    MatTableModule,
    CanvasJSAngularChartsModule,
    MatPaginator,
    MatTabGroup,
    MatTab,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


