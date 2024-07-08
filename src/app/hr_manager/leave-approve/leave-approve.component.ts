import {Component, OnInit} from '@angular/core';
import {EmployeeLeave} from "../../model/employeeLeave";
import {AxiosService} from "../../axios.service";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";


@Component({
  selector: 'app-leave-approve',
  templateUrl: './leave-approve.component.html',
  styleUrl: './leave-approve.component.css'
})


export class LeaveApproveComponent implements OnInit{

  leaveHistorySummary: LeaveHistorySummaryDto | null = null;
  gatePassesHistorySummary: GatePassesHistorySummaryDto | null = null;

  constructor(private axios:AxiosService) {

  }
  async ngOnInit() {

    this.dataSource.filterPredicate = (data: EmployeeLeave, filter: string) => {
      return data.emp_id.toLowerCase().includes(filter);
    };

    this.dataSource2.filterPredicate = (data: gatePassApprove, filter: string) => {
      return data.emp_id.toLowerCase().includes(filter);
    };
    await this.LeaveDetails();
    await this.getGatePass();

  }

  //this filter method for search employee



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }



  displayedColumns: string[] = ['employee_leave_id', 'emp_id','leave_type', 'reson', 'start_time','end_time','status'];
  dataSource = new MatTableDataSource<EmployeeLeave>([]);
  selectedRow: EmployeeLeave | null = null;
  ELEMENT_DATA: EmployeeLeave[] = [
  ];

  displayedColumns2: string[] = ['employee_gate_pass_id', 'emp_id','in_time', 'out_time', 'date','reson','status'];
  dataSource2 = new MatTableDataSource<gatePassApprove>([]);
  selectedRow2: gatePassApprove | null = null;
  ELEMENT_DATA2: gatePassApprove[] = [
  ];

  selectRowleavePDF(row:EmployeeLeave) {
    this.selectedRow = this.selectedRow === row ? null : row;
  }
  leaveReportVisible: boolean = false;
  leaveHistoryVisible:boolean=false;

  gotoReport() {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });      return;
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
      const result = await Swal.fire({
        icon: 'question',
        title: 'Confirmation',
        text: `Are you sure you want to ${status} this leave request?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      });

      if (result.isConfirmed) {
        await this.saveStatusUpdate(this.selectedRow.employee_leave_id, status);
      }
    }
  }

  async saveStatusUpdate(employee_leave_id: number, status: string): Promise<void> {
    try {
      await this.axios.request('PUT', `/updateLeaveStatus?employee_leave_id=${employee_leave_id}&status=${status}`,{},{});
      Swal.fire({
        icon: 'success',
        title: 'Leave Status Updated',
        text: 'Leave status has been successfully updated.',
      });
      await this.LeaveDetails(); // Refresh leave details after update
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating Leave Status.',
      });
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


  //gate pass manage

  gatePassRequestVisible:boolean=false;
  gatePassForm: boolean = false;
  GatePassHistoryVisible: boolean = false;

  selectRowGatePass(row:gatePassApprove) {
    this.selectedRow2 = this.selectedRow2 === row ? null : row;
  }

  gotoGatePass() {

    this.gatePassRequestVisible=!this.gatePassRequestVisible;
  }

  giveGatePassAction() {

    if (!this.selectedRow2) {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });      return;
    }

    this.gatePassForm=!this.gatePassForm;

    if(!this.gatePassForm){
      this.selectedRow2=null;
    }

  }

  async getGatePass():Promise<void> {
    try {
      const response = await this.axios.request('GET', '/getGatepass', {}, {});
      this.dataSource2.data = response.data;
      this.ELEMENT_DATA2 = this.dataSource2.data;
      console.log('getGatePass Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching getGatePass Details:', error);
    }

  }


  async updateGatePassStatus(status: string) {
    if (this.selectedRow2) {
      const result = await Swal.fire({
        icon: 'question',
        title: 'Confirmation',
        text: `Are you sure you want to ${status} this GatePass request?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      });

      if (result.isConfirmed) {
        await this.saveGatePassStatusUpdate(this.selectedRow2.employee_gate_pass_id, status);
      }
    }
  }

  async saveGatePassStatusUpdate(employee_gate_pass_id: number, status: string): Promise<void> {
    try {
      await this.axios.request('PUT',`/updateGatePassStatus?employee_gate_pass_id=${employee_gate_pass_id}&status=${status}`,{},{});
      Swal.fire({
        icon: 'success',
        title: 'GatePass Status Updated',
        text: 'GatePass status has been successfully updated.',
      });
      await this.getGatePass();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating GatePass status.',
      });
    }
  }

  closeDatePassHistory() {
    this.GatePassHistoryVisible=false;
  }

  //get selected employee gate pass history
  async viewGatePassHistory() {

    const empId=(document.getElementById('emp_id2') as HTMLInputElement).value;
    try {
      const response = await this.axios.request('GET', `/gatePassesHistorySummary?empId=${empId}`, {}, {});
      this.gatePassesHistorySummary = response.data;
      this.GatePassHistoryVisible = true;
      console.log('Leave History Summary:', this.gatePassesHistorySummary);
    } catch (error) {
      console.error('Error fetching Leave History Summary:', error);
    }

  }
}

/*this interfaces create for back end DTO classes to set back end object to front end object
* */
export interface LeaveHistorySummaryDto {

  approvedCount: number;
  rejectedCount: number;
  empId: string;
  employeeName: string;
  jobRole: string;
}

export interface GatePassesHistorySummaryDto {

  approvedCount: number;
  rejectedCount: number;
  empId: string;
  employeeName: string;
  jobRole: string;
}

export interface gatePassApprove{

  employee_gate_pass_id:number;
  emp_id:string;
  in_time:string;
  out_time:string;
  date:string;
  reson:string;
  status:string;

}
