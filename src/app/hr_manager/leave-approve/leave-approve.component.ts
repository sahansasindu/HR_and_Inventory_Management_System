import {Component, OnInit} from '@angular/core';
import {EmployeeLeave} from "../../model/employeeLeave";
import {AxiosService} from "../../axios.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrl: './leave-approve.component.css'
})
export class LeaveApproveComponent implements OnInit{
  constructor(private employeeLeave:EmployeeLeave,private axios:AxiosService) {

  }
  async ngOnInit() {
    await this.LeaveDetails();
  }
  displayedColumns: string[] = ['employee_leave_id', 'emp_id','leave_type', 'reson', 'start_time','end_time','status'];
  dataSource = new MatTableDataSource<EmployeeLeave>([]);
  selectedRow: EmployeeLeave | null = null;
  ELEMENT_DATA: EmployeeLeave[] = [
  ];

  selectRowleavePDF(row:EmployeeLeave) {
    this.selectedRow = row;
  }
  leaveReportVisible: boolean = false;

  gotoReport() {

    if (!this.selectedRow) {
      alert("No row selected")
      return;
    }

    this.leaveReportVisible=!this.leaveReportVisible;
  }
  async LeaveDetails():Promise<void> {
    try {
      const response = await this.axios.request('GET', '/getLeaveData', {}, {});
      this.dataSource.data = response.data;
      this.ELEMENT_DATA = this.dataSource.data;
      console.log('Leave Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Leave Details:', error);
    }

  }
}
