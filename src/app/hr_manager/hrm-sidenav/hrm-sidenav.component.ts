import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HrmLeaveAndMedicalComponent} from "../hrm-leave-and-medical/hrm-leave-and-medical.component";

@Component({
  selector: 'app-hrm-sidenav',
  templateUrl: './hrm-sidenav.component.html',
  styleUrl: './hrm-sidenav.component.css'
})
export class HrmSidenavComponent {
  constructor(private router: Router) {} // Inject Router
  logout() {

    this.router.navigate(['/login']);

  }
}
