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

  leaveHistorySummary: LeaveHistorySummaryDto | null = null;


  constructor(private axios:AxiosService) {

  }
  async ngOnInit() {

    this.dataSource.filterPredicate = (data: EmployeeLeave, filter: string) => {
      return data.emp_id.toLowerCase().includes(filter);
    };
    await this.LeaveDetails();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  displayedColumns: string[] = ['employee_leave_id', 'emp_id','leave_type', 'reson', 'start_time','end_time','status'];
  dataSource = new MatTableDataSource<EmployeeLeave>([]);
  selectedRow: EmployeeLeave | null = null;
  ELEMENT_DATA: EmployeeLeave[] = [
  ];

  selectRowleavePDF(row:EmployeeLeave) {
    this.selectedRow = this.selectedRow === row ? null : row;
  }
  leaveReportVisible: boolean = false;
  leaveHistoryVisible:boolean=false;

  gotoReport() {

    if (!this.selectedRow) {
      alert("Please Select Row and Click...")
      return;
    }

    this.leaveReportVisible=!this.leaveReportVisible;

    if(!this.leaveReportVisible){
      this.selectedRow=null;
    }

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

  async updateLeaveStatus(status: string) {
    if (this.selectedRow) {
      const confirmUpdate = window.confirm(`Are you sure you want to ${status} this leave request?`);
      if (confirmUpdate) {
        await this.saveStatusUpdate(this.selectedRow.employee_leave_id, status);
      }
    }
  }

  async saveStatusUpdate(employee_leave_id: number, status: string): Promise<void> {
    try {
      await this.axios.request('PUT', `/updateLeaveStatus?employee_leave_id=${employee_leave_id}&status=${status}`,{},{});
      alert('Leave Status Updated:');
      await this.LeaveDetails(); // Refresh leave details after update
    } catch (error) {
      console.error('Error updating Leave Status:', error);
      alert('Error updating Leave Status:');
    }
  }

  async viewLeaveHistory(): Promise<void> {

    const empId=(document.getElementById('emp_id') as HTMLInputElement).value;
    try {
      const response = await this.axios.request('GET', `/getLeaveHistorySummary?empId=${empId}`, {}, {});
      this.leaveHistorySummary = response.data;
      this.leaveHistoryVisible = true;
      console.log('Leave History Summary:', this.leaveHistorySummary);
    } catch (error) {
      console.error('Error fetching Leave History Summary:', error);
    }
  }

  closeLeaveReport(): void {
    this.leaveHistoryVisible = false;
  }
}
export interface LeaveHistorySummaryDto {

  approvedCount: number;
  rejectedCount: number;
  empId: string;
  employeeName: string;
  jobRole: string;
}

