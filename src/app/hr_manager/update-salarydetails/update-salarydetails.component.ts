import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-salarydetails',
  templateUrl: './update-salarydetails.component.html',
  styleUrl: './update-salarydetails.component.css'
})
export class UpdateSalarydetailsComponent implements OnInit{

  id: any;
  basicsalaryData = {



    basic_salary_id:null,
    basic_amount:null,
    br_1:null,
    br_2:null,
    department_name: "",
    get_pass_amount:null,
    initial_days:null,
    initial_nopay_amount:null,
    job_role: "",
    ot_amount:null,
    salary_type:"",
    section_name:"",
    subsistant:null,

  };

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchInvoiceData();
    });
  }

  fetchInvoiceData() {
    this.axiosService.request('GET', `/getSalaryByID/${this.id}`, null,{})
      .then(response => {
        // Directly update deductionData object with fetched data
        Object.assign(this.basicsalaryData, response.data);
        console.log(this.basicsalaryData);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleFormSubmit(formData: any) {
    // Include the id in the formData
    const updatedFormData = {
      ...formData,
      basic_salary_id: this.id // Assuming the backend expects the id field to identify the deduction detail to update
    };

    // Now, use the updatedFormData that includes the id for the update operation
    this.axiosService.request("PUT", "/updateSalary", updatedFormData,{})
      .then(response => {
        alert("BasicSalary updated successfully!");
        // Optionally, navigate to a different route upon successful update
        // this.router.navigate(['/someRoute']);
      })
      .catch(error => {
        console.error("There was an error updating the BasicSalary.", error);
        alert("There was an error updating the BasicSalary.");
      });
  }

  onBack() {

    this.router.navigate(['./mdc']);

  }



}
