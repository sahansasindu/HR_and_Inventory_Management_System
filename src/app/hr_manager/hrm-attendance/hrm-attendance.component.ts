// import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from "@angular/material/icon";
import {MatTable} from "@angular/material/table";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hrm-attendance',
  templateUrl: './hrm-attendance.component.html',
  styleUrl: './hrm-attendance.component.css',
})
export class HrmAttendanceComponent {
  sideBarOpen = true;
  displayedColumns: string[] = ['date', 'employeeId', 'employeeName', 'inTime', 'outTime', 'attendanceStatus'];
  // dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<PeriodicElement>;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {
    this.dataSource = new MatTableDataSource<PeriodicElement>();
    this.paginator = new MatPaginator(null!, null!); // Initializing paginator
    this.sort = new MatSort(); // Initializing sort
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAttendanceData();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAttendanceData() {
    this.http.get<any>('http://localhost:8080/attendance').subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.log('Error fetching attendance data:', error);
      }
    );
  }
}


export interface PeriodicElement {
  date: string;
  employeeId: number;
  employeeName: string;
  inTime: string;
  outTime: string;
  attendanceStatus: string;
}

