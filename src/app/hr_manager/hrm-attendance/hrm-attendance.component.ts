import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from "@angular/material/icon";
import {MatTable} from "@angular/material/table";
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-hrm-attendance',
  templateUrl: './hrm-attendance.component.html',
  styleUrl: './hrm-attendance.component.css',
})
export class HrmAttendanceComponent implements OnInit {
  sideBarOpen = true;
  displayedColumns: string[] = ['date', 'emp_id', 'in_time', 'out_time', 'attendance_status'];
  dataSource: any[] = [];


  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private axiosService: AxiosService) {}

  ngOnInit() {
    this.loadAttendance();
  }

  loadAttendance() {
    this.axiosService.getAttendance().then((response: { data: any[]; }) => {
      this.dataSource = response.data;
    }).catch((error: any) => {
      console.error('Error fetching attendance data:', error);
    });
  }
}
