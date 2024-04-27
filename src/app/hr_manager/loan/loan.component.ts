import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.css'
})
export class LoanComponent implements OnInit  {
  loarddata: any[] = [];
  id: any;


  filtereddata: any[] = [];
  isLoading: boolean = false;
  employeeId: any;


  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}



  ngOnInit() {
    this.fetchLoan();
  }

  fetchLoan() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getLoan', null,{})
      .then(response => {
        this.filtereddata = response.data;
        this.loarddata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.loarddata);



      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }

  filterByEmployeeId() {
    if (this.employeeId === "") {
      this.fetchLoan();
    } else {
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.loarddata = this.filtereddata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }
  }



  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }



  Update(id: any) {
    this.router.navigate(['update-loan',id]);
  }


  Delete(id: any) {


    this.axiosService.request('DELETE', '/deleteLoan', { loan_id: id },{})
      .then(response => {

        this.fetchLoan();
        console.log("Response from server:", response);

        alert("Loan deleted successfully!");



      })
      .catch(error => {
        console.error("Error deleting Deduction:", error);
        alert("Error deleting Deduction!");


      });
  }



}
