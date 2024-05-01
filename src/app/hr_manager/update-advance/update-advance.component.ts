import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-advance',
  templateUrl: './update-advance.component.html',
  styleUrl: './update-advance.component.css'
})
export class UpdateAdvanceComponent {

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
      "/hrandproduction/updateAdvance",
      {
        "advance_salary_id":this.id,
        "amount": this.amount,
        "reson": this.reson,
        "status": this.astatus,
        "emp_id":this.empid,
      },
      {}
    ).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
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
