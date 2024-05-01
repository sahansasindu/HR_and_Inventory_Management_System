/*
import { Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent {
  eid: any;
  sid: any;
  Did: any;
  satype: any;
  jrole: any;
  gender: any;
  empname: any;
  dob: any;
  mstate: any;
  contactno: any;
  cstatus: any;
  address: any;
  fileToUpload: File | null = null;

  constructor(private axiosService: AxiosService, private router: Router) {}




  submitData() {
    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const formData = new FormData(); // Create FormData object to send form data including file

    // Append form data to FormData object
    formData.append('employeeid', this.eid);
    formData.append('address', this.address);
    formData.append('company_status', this.cstatus);
    formData.append('contact', this.contactno);
    formData.append('cv', "null"); // Append file to FormData if it exists
    formData.append('dob', this.dob);
    formData.append('employee_name', this.empname);
    formData.append('gender', this.gender);
    formData.append('job_role', this.jrole);
    formData.append('ma_uma', this.mstate);
    formData.append('salary_type', this.satype);
    formData.append('dep_id', this.Did);
    formData.append('sec_id', this.sid);

    // Send POST request with FormData
    this.axiosService.request("POST", "/addEmployee", formData,headers)
      .then(response => {
        console.log("Response from server:", response);
        alert("User details updated successfully!");
      })
      .catch(error => {
        console.error("Error updating user details:", error);
        alert("Error updating user details. Please try again.");
      });
  }


  onFileSelected($event: Event) {

  }

  onUpload() {

  }
}
*/
/*
import { Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent {
  eid: any;
  sid: any;
  Did: any;
  satype: any;
  jrole: any;
  gender: any;
  empname: any;
  dob: any;
  mstate: any;
  contactno: any;
  cstatus: any;
  address: any;
  fileToUpload: File | null = null;

  constructor(private axiosService: AxiosService, private router: Router) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.fileToUpload = files[0];
    }
  }

  submitData() {

    console.log(this.fileToUpload);
    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const formData = new FormData();

    formData.append('employeeid', this.eid);
    formData.append('address', this.address);
    formData.append('company_status', this.cstatus);
    formData.append('contact', this.contactno);
    if (this.fileToUpload) {
      formData.append('cv', "null");
    }
    formData.append('dob', this.dob);
    formData.append('employee_name', this.empname);
    formData.append('gender', this.gender);
    formData.append('job_role', this.jrole);
    formData.append('ma_uma', this.mstate);
    formData.append('salary_type', this.satype);
    formData.append('dep_id', this.Did);
    formData.append('sec_id', this.sid);

    this.axiosService.request("POST", "/addEmployee", formData, headers)
      .then(response => {
        console.log("Response from server:", response);
        alert("User details updated successfully!");
      })
      .catch(error => {
        console.error("Error updating user details:", error);
        alert("Error updating user details. Please try again.");
      });
  }
}

*/

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-employee',
  templateUrl: './add-new-employee.component.html',
  styleUrls: ['./add-new-employee.component.css']
})
export class AddNewEmployeeComponent {
  eid: any;
  sid: any;
  Did: any;
  satype: any;
  jrole: any;
  gender: any;
  empname: any;
  dob: any;
  mstate: any;
  contactno: any;
  cstatus: any;
  address: any;
  fileToUpload: File | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.fileToUpload = files[0];
    }
  }

  submitData() {
    const token = localStorage.getItem('currentUser');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('employeeid', this.eid);
    formData.append('address', this.address);
    formData.append('company_status', this.cstatus);
    formData.append('contact', this.contactno);
    formData.append('dob', this.dob);
    formData.append('employee_name', this.empname);
    formData.append('gender', this.gender);
    formData.append('job_role', this.jrole);
    formData.append('ma_uma', this.mstate);
    formData.append('salary_type', this.satype);
    formData.append('dep_id', this.Did);
    formData.append('sec_id', this.sid);
    if (this.fileToUpload) {
      formData.append('cv', this.fileToUpload, this.fileToUpload.name);
    }

    this.http.post('/hrandproduction/addEmployee', formData, { headers: headers })
      .subscribe({
        next: (response) => {
          console.log("Response from server:", response);
          alert("Employee details added successfully!");
          this.router.navigate(['/some-path']); // Adjust the navigation path as needed
        },
        error: (error) => {
          console.error("Error updating employee details:", error);
          alert("Error updating employee details. Please try again.");
        }
      });
  }
}
