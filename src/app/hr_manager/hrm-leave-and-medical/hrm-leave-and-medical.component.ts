import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-leave-and-medical',
  templateUrl: './hrm-leave-and-medical.component.html',
  styleUrl: './hrm-leave-and-medical.component.css'
})
export class HrmLeaveAndMedicalComponent {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'
  displayedColumns: string[] = ['employeeId', 'employeeName', 'department', 'date', 'type', 'reason', 'approvalState'];
  dataSource = ELEMENT_DATA;
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
  isLeaveVisible: boolean =false;

  swaptoLeave() {
    this.isLeaveVisible=!this.isLeaveVisible;
  }
}
export interface PeriodicElement {
  employeeId: number;
  employeeName: string;
  department: string;
  date: string;
  type: string;
  reason: string;
  approvalState: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {employeeId: 1, employeeName: 'Kamal', department: 'Production' , date: '2024-04-10', type: 'Gate_pass', reason: 'abcd', approvalState: 'Approved'},
  // {employeeId: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
