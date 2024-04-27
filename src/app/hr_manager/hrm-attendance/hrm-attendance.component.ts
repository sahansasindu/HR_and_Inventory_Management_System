import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hrm-attendance',
  templateUrl: './hrm-attendance.component.html',
  styleUrl: './hrm-attendance.component.css'
})
export class HrmAttendanceComponent {
  sideBarOpen = true;
  displayedColumns: string[] = ['date', 'employeeId', 'employeeName', 'inTime', 'outTime', 'present', 'absent', 'late', 'attendanceStatus'];
  dataSource = ELEMENT_DATA;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  isDashboadVisible: boolean =false;

  swaptoDashboad() {
    this.isDashboadVisible=!this.isDashboadVisible;
  }
}


export interface PeriodicElement {
  date: string;
  employeeId: number;
  employeeName: string;
  inTime: string;
  outTime: string;
  present: string;
  absent: string;
  late: string;
  attendanceStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '2024-04-10', employeeId: 1, employeeName: 'Kamal', inTime: '08:00 AM' , outTime: '04:00 PM', present: '####', absent: '####' , late: '####', attendanceStatus: '####'},
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

