import { Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-update-allowancedetails',
  templateUrl: './update-allowancedetails.component.html',
  styleUrls: ['./update-allowancedetails.component.css'] // Change styleUrl to styleUrls
})
export class UpdateAllowancedetailsComponent implements OnInit {

  id: any;
  allowanceData = {
    allowances_amount: null,
    allowances_id: null,
    department_name: "",
    job_role: "",
    salary_type: "",
    section_name: "",
    allowances_type: "",
  };

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchAllowanceData(); // Changed from fetchInvoiceData to fetchAllowanceData
    });
  }

  fetchAllowanceData() { // Changed from fetchInvoiceData to fetchAllowanceData
    this.axiosService.request('GET', `/getAllowanceByID/${this.id}`, null,{})
      .then(response => {
        Object.assign(this.allowanceData, response.data);
        console.log(this.allowanceData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleFormSubmit(formData: any) {
    const updatedFormData = {
      ...formData,
      allowances_id: this.id
    };

    this.axiosService.request("PUT", "/updateAllowance", updatedFormData,{}) // Changed from "/updateDeduction" to "/updateAllowance"
      .then(response => {
        alert("Allowance updated successfully!");
        // Navigate to a different route upon successful update
        this.router.navigate(['/allowance']); // Changed to navigate to '/allowance' route
      })
      .catch(error => {
        console.error("There was an error updating the Allowance.", error);
        alert("There was an error updating the Allowance.");
      });
  }

  onBack() {
    this.router.navigate(['/allowance']); // Changed to navigate to '/allowance' route
  }
}
