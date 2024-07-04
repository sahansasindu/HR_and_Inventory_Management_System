import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-salary-advance',
  templateUrl: './salary-advance.component.html',
  styleUrl: './salary-advance.component.css'
})
export class SalaryAdvanceComponent {

  id: any;
  advancedata: any[] = [];
  filtereddata: any[] = [];
  isLoading: boolean = false;
  employeeId: any;
  page: number = 1; // <-- current page


  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.fetchAdvance();
  }

  fetchAdvance() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getAdvance', null,{})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.filtereddata = response.data;
        this.advancedata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.advancedata); // Corrected logging statement



      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }





  Update(id: any) {
    this.router.navigate(['update-advance',id]);
  }




  Delete(id: any) {

    if (confirm('Are you sure you want to delete this deduction?')) {
      this.axiosService.request('DELETE', 'deleteAdvance', {advance_salary_id: id}, {})
        .then(response => {

          this.fetchAdvance();
          console.log("Response from server:", response);

          alert("Advance deleted successfully!");


        })
        .catch(error => {
          console.error("Error deleting Allowance:", error);
          alert("Error deleting Allowance!");


        });
    }

  }

  filterByEmployeeId() {
    if (this.employeeId === "") {
      this.fetchAdvance();
    } else {
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.advancedata = this.filtereddata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }
  }

  pageChanged(event: number) {
    this.page = event;
  }


}
