import { Component } from '@angular/core';
import {AxiosService} from "../../axios.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-updatedepartment',
  templateUrl: './updatedepartment.component.html',
  styleUrl: './updatedepartment.component.css'
})
export class UpdatedepartmentComponent {
  empid: any;
  amount: any;
  reson: any;
  astatus: any;

  loandata: any[] = [];
  id: any;

  constructor(private axiosService: AxiosService, private router: Router, private route: ActivatedRoute) {}




  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.fetchInvoiceData()
    });
  }

  fetchInvoiceData() {
    console.log(this.id);
    this.axiosService.request('GET', `/getAdvanceByID/${this.id}`, null,{})
      .then(response => {
        this.empid=response.data.emp_id;
        this.amount=response.data.amount;
        this.reson=response.data.reson;
        this.astatus=response.data.status;

      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  submitData1() {
    console.log(this.empid);
    console.log(this.id);
    this.axiosService.request(
      "PUT",
      "/updateAdvance",
      {
        "advance_salary_id":this.id,
        "amount": this.amount,
        "reson": this.reson,
        "status": this.astatus,
        "emp_id":this.empid


      },
      {}
    ).then(response => {
      console.log("Response from server:", response);
      alert("Advance details updated successfully!");
    }).catch(error => {
      console.error("Error updating Advance details:", error);
      let errorMessage = "An error occurred while updating Advance details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });
  }




  back() {
    this.router.navigate(['/salaryadvance']);
  }
}
