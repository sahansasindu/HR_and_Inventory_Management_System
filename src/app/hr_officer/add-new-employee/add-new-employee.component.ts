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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.fileToUpload = input.files[0];
    }
  }

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
    if (this.fileToUpload) {
      formData.append('cv', this.fileToUpload); // Append file to FormData if it exists
    }
    formData.append('dob', this.dob);
    formData.append('employee_name', this.empname);
    formData.append('gender', this.gender);
    formData.append('job_role', this.jrole);
    formData.append('ma_uma', this.mstate);
    formData.append('salary_type', this.satype);
    formData.append('dep_id', this.Did);
    formData.append('sec_id', this.sid);

    // Send POST request with FormData
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
