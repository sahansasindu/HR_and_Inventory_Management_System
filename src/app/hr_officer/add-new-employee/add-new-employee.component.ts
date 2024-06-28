import { Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";
import {Employee} from "../../model/employeemodel";

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent {

  employee: Employee = new Employee('', '', '', '', '', '', '', '', '', '', '', '', null);


  constructor(private axiosService: AxiosService, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.employee.cv = input.files[0];
    }
  }

  async submitData() {
    const formData = new FormData();

    formData.append('employeeid', this.employee.employeeid);
    formData.append('job_role', this.employee.job_role);
    formData.append('salary_type', this.employee.salary_type);
    formData.append('employee_name', this.employee.employee_name);
    formData.append('dob', this.employee.dob);
    formData.append('address', this.employee.address);
    formData.append('gender', this.employee.gender);
    formData.append('ma_uma', this.employee.ma_uma);
    formData.append('contact', this.employee.contact);
    formData.append('company_status', this.employee.company_status);
    formData.append('dep_id', this.employee.dep_id);
    formData.append('sec_id', this.employee.sec_id);

    if (this.employee.cv) {
      formData.append('cv', this.employee.cv);
    }

    try {
      const response = await this.axiosService.request('POST', '/addEmployee', formData, { 'Content-Type': 'multipart/form-data' });
      console.log('Response from server:', response);
      alert('Employee added successfully!');
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  }

}
