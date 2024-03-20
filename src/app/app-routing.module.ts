import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import{ContainerComponent} from "./container/container.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'container', component: ContainerComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]},
  { path: '', redirectTo: 'container', pathMatch: 'full' },
  // Other routes if needed
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
