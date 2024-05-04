import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-update-employee-details',
  templateUrl: './hrm-update-employee-details.component.html',
  styleUrl: './hrm-update-employee-details.component.css'
})
export class HrmUpdateEmployeeDetailsComponent{


  sideBarOpen = true;
  // displayedColumns: string[] = ['employeeId', 'employeeName', 'department', 'section', 'occupation','actions'];

  displayedColumns: string[] = ['employeeId', 'employeeName', 'address', 'dateofbirth', 'department', 'section', 'occupation','actions'];
  dataSource =ELEMENT_DATA;
  router: any;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  isUpdateForm: boolean=false;

  swaptoUpdateForm() {
    this.isUpdateForm=!this.isUpdateForm;
  }

  employee = {
    employeeName: '',
    employeeId: '',
    age: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    maritalStatus: '',
    department: '',
    section: '',
    occupation: '',
  };

}

export interface PeriodicElement {
  employeeId: number;
  employeeName: string;
  // age: number;
  address: string;
  dateofbirth: string;
  // gender: string;
  // contactno: string;
  // marriedOrunmarried: string;
  department: string;
  section: string;
  occupation: string;
  actions: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {employeeId: 1, employeeName: 'Kamal', department: 'IT', section: 'Software', occupation: 'Software Engineer', actions: 'Update'},
  {employeeId: 1, employeeName: 'Kamal', address: 'Kandy', dateofbirth: '####', department: 'IT', section: 'Software', occupation: 'Software Engineer', actions: 'Update'},
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
