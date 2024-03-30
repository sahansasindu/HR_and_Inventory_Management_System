import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './hr_officer/header/header.component';
import { SidenavComponent } from './hr_officer/sidenav/sidenav.component';
import { DashboardComponent } from './hr_officer/dashboard/dashboard.component';
// Import Angular Material modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './common/login/login.component';
import { ContainerComponent } from './hr_officer/container/container.component';
import { ResetpwordComponent } from './common/resetpword/resetpword.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { NotificationComponent } from './hr_officer/notification/notification.component';
import { PiechartComponent } from './hr_officer/piechart/piechart.component';
import { SignupComponent } from './common/signup/signup.component';
import { HrmContainerComponent } from './hr_manager/hrm-container/hrm-container.component';
import { HrmDashboardComponent } from './hr_manager/hrm-dashboard/hrm-dashboard.component';
import { HrmHeaderComponent } from './hr_manager/hrm-header/hrm-header.component';
import { HrmSidenavComponent } from './hr_manager/hrm-sidenav/hrm-sidenav.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
// Import provideHttpClient withFetch
import { HttpClientModule,provideHttpClient, withFetch } from '@angular/common/http';
import { DashboardstoreComponent } from './store_keeper/dashboardstore/dashboardstore.component';
import { HeaderstoreComponent } from './store_keeper/headerstore/headerstore.component';
import { SidemenubarstoreComponent } from './store_keeper/sidemenubarstore/sidemenubarstore.component';
import { NotificationcomComponent } from './common/notificationcom/notificationcom.component';
import { ProductioncricleComponent } from './common/productioncricle/productioncricle.component';
import { ContainerstoreComponent } from './store_keeper/containerstore/containerstore.component';
import { EmptysectionComponent } from './store_keeper/sections/emptysection/emptysection.component';
import { WashingsectionComponent } from './store_keeper/sections/washingsection/washingsection.component';
import { MilkproductionsectionComponent } from './store_keeper/sections/milkproductionsection/milkproductionsection.component';
import { LoardingsectionComponent } from './store_keeper/sections/loardingsection/loardingsection.component';
import {MatOption, MatSelect} from "@angular/material/select";

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
    HeaderstoreComponent,
    SidemenubarstoreComponent,
    NotificationcomComponent,
    ProductioncricleComponent,
    ContainerstoreComponent,
    DashboardstoreComponent,
    EmptysectionComponent,
    WashingsectionComponent,
    MilkproductionsectionComponent,
    LoardingsectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    MatSelect,
    MatOption,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
