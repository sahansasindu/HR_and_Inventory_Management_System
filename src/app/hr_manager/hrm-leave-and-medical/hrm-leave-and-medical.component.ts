import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AxiosService } from '../../axios.service';

@Component({
  selector: 'app-hrm-leave-and-medical',
  templateUrl: './hrm-leave-and-medical.component.html',
  styleUrl: './hrm-leave-and-medical.component.css'
})
export class HrmLeaveAndMedicalComponent implements OnInit {
  sideBarOpen = true; // Fixed the assignment, should be '=' not ':'
  displayedColumns: string[] = ['emp_id', 'leave_type', 'reson', 'start_time', 'end_time', 'status'];
  dataSource: any[] = [];

  // @ViewChild('leavePaginator') leavePaginator!: MatPaginator;


  DisplayedColumns: string[] = ['emp_id', 'emp_name', 'submit_date', 'medical_report', 'medical_status'];
  DataSource: any[] = [];

  // @ViewChild('medicalPaginator') medicalPaginator!: MatPaginator;

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.leavePaginator;
  //   this.DataSource.paginator = this.medicalPaginator;
  //
  // }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  constructor(private axiosService: AxiosService) {}

  ngOnInit() {
    this.loadMedical();
    // this.loadLeave();
  }


  isLeaveVisible: boolean =false;

  swaptoLeave() {
    this.isLeaveVisible=!this.isLeaveVisible;
  }

  isMedicalVisible: boolean =false;

  swaptoMedical() {
    this.isMedicalVisible=!this.isMedicalVisible;
  }

  loadMedical() {
    this.axiosService.getMedical()
      .then((response: { data: any[]; }) => {
        this.DataSource = response.data;
      })
      .catch((error: any) => {
        console.error('Error fetching medical data:', error);
      });
  }

  loadLeave() {
    this.axiosService.getLeave()
      .then((response: { data: any[]; }) => {
        this.dataSource = response.data;
      })
      .catch((error: any) => {
        console.error('Error fetching leave data:', error);
      });
  }
}



