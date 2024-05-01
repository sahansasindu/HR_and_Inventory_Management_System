import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AxiosService } from '../../axios.service';
import {FormsModule} from "@angular/forms"; // Import AxiosService

@Component({
  selector: 'app-add-payrool-details',
  templateUrl: './add-payrool-details.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./add-payrool-details.component.css']
})
export class AddPayroolDetailsComponent {
  basicamount: any;
  br1: any;
  br2: any;
  depName: string="";
  gpass_amount: any;
  Initial_days: any;
  nopay_amount: any;
  job_role: string="";
  ot_amount: any;
  salary_type: string="";
  section_name: string="";
  subsistant: any;

  constructor(private axiosService: AxiosService, // Inject AxiosService
              private router: Router) {}

  back() {
    this.router.navigate(['./mdc']);
  }

  submitData() {


    if (this.basicamount == "" || this.gpass_amount == "" || this.Initial_days == "" || this.nopay_amount == "" || this.job_role == "" || this.salary_type == "" || this.section_name == "" || this.depName == "") {
      alert("Please Fill The Fields...")
    } else {


      console.log(this.basicamount);
      console.log(this.br1);
      console.log(this.br2);
      console.log(this.depName);
      console.log(this.gpass_amount);
      console.log(this.Initial_days);
      console.log(this.nopay_amount);
      console.log(this.job_role);
      console.log(this.salary_type);
      console.log(this.section_name);
      console.log(this.subsistant);
      console.log(this.ot_amount);


      this.axiosService.request(
        "POST",
        "addSalary", {
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
        alert("salary registered successfully!");
      }).catch(error => {
        // Handle errors here
        console.error("Error registering salaryr:", error);
        alert("User name or Password Already Exist...");
      });
    }

  }
}
