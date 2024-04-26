import { Component, OnInit } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-update-deductiondetails',
  templateUrl: './update-deductiondetails.component.html',
  styleUrls: ['./update-deductiondetails.component.css']
})
export class UpdateDeductiondetailsComponent implements OnInit {
  id: any;
  deductionData = {

    deduction_id:null,
    deduction_amount: null,
    department_name: "",
    job_role: "",
    salary_type: "",
    section_name: "",
    deduction_type: "",


  };

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchInvoiceData();
    });
  }

  fetchInvoiceData() {
    this.axiosService.request('GET', `/getDeductionByID/${this.id}`, null,{})
      .then(response => {
        // Directly update deductionData object with fetched data
        Object.assign(this.deductionData, response.data);
        console.log(this.deductionData);

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleFormSubmit(formData: any) {
    // Include the id in the formData
    const updatedFormData = {
      ...formData,
      deduction_id: this.id // Assuming the backend expects the id field to identify the deduction detail to update
    };

    // Now, use the updatedFormData that includes the id for the update operation
    this.axiosService.request("PUT", "/updateDeduction", updatedFormData,{})
      .then(response => {
        alert("Deduction updated successfully!");
        console.log(this.deductionData);
        // Optionally, navigate to a different route upon successful update
        // this.router.navigate(['/someRoute']);
      })
      .catch(error => {
        console.error("There was an error updating the deduction.", error);
        alert("There was an error updating the deduction.");
      });
  }


  onBack() {

    this.router.navigate(['./deduction']);

  }
}
