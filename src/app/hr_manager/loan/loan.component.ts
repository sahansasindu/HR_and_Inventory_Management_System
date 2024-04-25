import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent implements OnInit  {
  loandata: any[] = [];
  id: any;



  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}

  filterByDepartment() {
    console.log(this.selectedDepartment)


    if(this.selectedDepartment=="All"){
      this.fetchDeductionData();
    }else{
      this.loandata=this.salaryheader2;
      this.salaryheader = this.loandata.filter(item => item.department_name === this.selectedDepartment);
      this.loandata=this.salaryheader;
    }


  }
  ngOnInit() {
    this.fetchDeductionData();
  }

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getLoan', null,{})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.salaryheader2 = response.data;
        this.loandata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.loandata); // Corrected logging statement



      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }


  addloandetails() {
    this.router.navigate(['./add-loan']);
  }


  Update(id: any) {
    this.router.navigate(['deductionupdate',id]);
  }




  Delete(id: any) {


    this.axiosService.request('DELETE', 'deleteDeduction', { deduction_id: id },{})
      .then(response => {

        this.fetchDeductionData();
        console.log("Response from server:", response);

        alert("Deduction deleted successfully!");



      })
      .catch(error => {
        console.error("Error deleting Deduction:", error);
        alert("Error deleting Deduction!");


      });
  }

}
