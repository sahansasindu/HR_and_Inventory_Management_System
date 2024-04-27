import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-update-employee-details',
  templateUrl: './hrm-update-employee-details.component.html',
  styleUrl: './hrm-update-employee-details.component.css'
})
export class HrmUpdateEmployeeDetailsComponent{
  sideBarOpen = true;
  displayedColumns: string[] = ['employeeId', 'employeeName', 'department', 'section', 'occupation'];

  // displayedColumns: string[] = ['employeeId', 'employeeName', 'age', 'address', 'dateofbirth', 'gender', 'contactno', 'marriedOrunmarried', 'department', 'section', 'occupation'];
  dataSource =ELEMENT_DATA;
  router: any;

  // @ViewChild('MatPaginator') paginator!: MatPaginator;
  //
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //
  // }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  navigateToUpdateForm(employeeId: number) {
    this.router.navigate(['/hrmupdateform', employeeId]);
  }

}

export interface PeriodicElement {
  employeeId: number;
  employeeName: string;
  // age: number;
  // address: string;
  // dateofbirth: string;
  // gender: string;
  // contactno: string;
  // marriedOrunmarried: string;
  department: string;
  section: string;
  occupation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {employeeId: 1, employeeName: 'Kamal', department: 'IT', section: 'Software', occupation: 'Software Engineer'},
  // {employeeId: 1, employeeName: 'Kamal', age: 23 , address: 'Kandy', dateofbirth: '####', gender: 'Male' , contactno: '0701234567', marriedOrunmarried: 'Unmarried', department: 'IT', section: 'Software', occupation: 'Software Engineer'},
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
