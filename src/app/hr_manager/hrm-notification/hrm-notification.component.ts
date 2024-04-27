import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
// import {periodicElement, PeriodicElement} from "../hrm-leave-and-medical/hrm-leave-and-medical.component";

@Component({
  selector: 'app-hrm-notification',
  templateUrl: './hrm-notification.component.html',
  styleUrl: './hrm-notification.component.css'
})
export class HrmNotificationComponent implements AfterViewInit  {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'


  displayedColumns: string[] = ['employeeId', 'employeeName', 'department', 'section', 'occupation'];
  dataSource = new MatTableDataSource<PeriodicElement>( ELEMENT_DATA );

  @ViewChild('Paginator') Paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.Paginator;

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }


  isTotalEmployees: boolean =false;

  swaptoTotalEmployees() {
    this.isTotalEmployees=!this.isTotalEmployees;
  }


  isCurrentlyWork: boolean =false;

  swaptoCurrentlyWork() {
    this.isCurrentlyWork=!this.isCurrentlyWork;
  }


  isTodayAbsents: boolean =false;

  swaptoTodayAbsents() {
    this.isTodayAbsents=!this.isTodayAbsents;
  }


  isShortLeavers: boolean =false;

  swaptoShortLeavers() {
    this.isShortLeavers=!this.isShortLeavers;
  }


  isGatePass: boolean =false;

  swaptoGatePass() {
    this.isGatePass=!this.isGatePass;
  }

}


export interface PeriodicElement {
  employeeId: number;
  employeeName: string;
  department: string;
  section: string;
  occupation: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {employeeId: 1, employeeName: 'Kamal', department: 'Production' , section: '####', occupation: '#####'},
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
