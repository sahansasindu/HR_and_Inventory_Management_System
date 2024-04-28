import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent {

  displayedColumns: string[] = ['employeeid', 'job_role', 'employee_name', 'dob', 'contact', 'address', 'gender', 'ma_uma', 'company_status'];

dataSource = [
  { name: 'John', id: 1 },
  { name: 'Alice', id: 2 },
  { name: 'Alice', id: 3 },
  { name: 'Alice', id: 1 },
  { name: 'Alice', id: 2 },
]


}
export class EmployeeDTO {
  employeeid: string='';
  job_role: string='';
  employee_name: string='';
  dob: string='';
  address: string='';
  gender: string='';
  ma_uma: string='';
  contact: string='';
  company_status: string='';
}

