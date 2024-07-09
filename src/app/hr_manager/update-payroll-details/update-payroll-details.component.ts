import { Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@Component({
    selector: 'app-update-payroll-details',
    templateUrl: './update-payroll-details.component.html',
    standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
    styleUrls: ['./update-payroll-details.component.css']
})
export class UpdatePayrollDetailsComponent implements OnInit {
  id: any;
  basicamount: any;
  br1: any;
  br2: any;
  depName: any;
  gpass_amount: any;
  Initial_days: any;
  nopay_amount: any;
  job_role: any;
  ot_amount: any;
  salary_type: any;
  section_name: string = "";
  subsistant: any;

  Invoiceheader: any[] = [];

  constructor(
    private axiosService: AxiosService,
    private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.fetchInvoiceData();
    });
  }

  back() {
    this.router.navigate(['./mdc']);
  }

  fetchInvoiceData() {
    this.axiosService.request('GET', `/getSalaryByID/${this.id}`, null,{})
      .then(response => {
        console.log(response.data.department_name); // Corrected logging statement

        this.basicamount = response.data.basic_amount;
        this.br1 = response.data.br_1;
        this.br2 = response.data.br_2;
        this.depName = response.data.department_name;
        this.gpass_amount = response.data.get_pass_amount;
        this.Initial_days = response.data.initial_days;
        this.nopay_amount = response.data.initial_nopay_amount;
        this.job_role = response.data.job_role;
        this.ot_amount = response.data.ot_amount;
        this.salary_type = response.data.salary_type;
        this.section_name = response.data.section_name;
        this.subsistant = response.data.subsistant;

        console.log(this.Invoiceheader); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  submitData() {
    this.axiosService.request(
      "PUT",
      "updateSalary",
      {
        "basic_salary_id": this.id,
        "basic_amount": this.basicamount,
        "br_1": this.br1,
        "br_2": this.br2,
        "department_name": this.depName,
        "get_pass_amount": this.gpass_amount,
        "initial_days": this.Initial_days,
        "initial_nopay_amount": this.nopay_amount,
        "job_role": this.job_role,
        "ot_amount": this.ot_amount,
        "salary_type": this.salary_type,
        "section_name": this.section_name,
        "subsistant": this.subsistant,
      }
    ,{}).then(response => {
      // Handle the response here
      console.log("Response from server:", response);
      // You can perform further actions based on the response
      alert("Data updated successfully!");
    }).catch(error => {
      // Handle errors here
      console.error("Error updating data:", error);
      alert("Error updating data. Please try again.");
    });
  }
}
