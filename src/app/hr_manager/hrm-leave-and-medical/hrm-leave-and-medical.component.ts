import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-leave-and-medical',
  templateUrl: './hrm-leave-and-medical.component.html',
  styleUrl: './hrm-leave-and-medical.component.css'
})
export class HrmLeaveAndMedicalComponent {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // constructor(private router: Router) {}
  //
  // // Include navigation functions if needed, e.g., navigateToMedicalDetails()
  //
  // navigateToMedicalDetails() {
  //   // This function should navigate to the Medical Details page
  //   this.router.navigate(['/medical-details']);
  // }
  //
  // navigateToLeavingDetails() {
  //   // This function should navigate to the Leaving Details page
  //   this.router.navigate(['/leaving-details']);
  // }

}
