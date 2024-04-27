import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-salary-advance',
  templateUrl: './salary-advance.component.html',
  styleUrl: './salary-advance.component.css'
})
export class SalaryAdvanceComponent {
  advancedata: any[] = [];
  id: any;



  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  employeeId: any;
  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}

  filterByDepartment() {
    console.log(this.selectedDepartment)


    if(this.selectedDepartment=="All"){
      this.fetchInvoiceData();
    }else{
      this.advancedata=this.salaryheader2;
      this.salaryheader = this.advancedata.filter(item => item.department_name === this.selectedDepartment);
      this.advancedata=this.salaryheader;
    }


  }
  ngOnInit() {
    this.fetchInvoiceData();
  }

  fetchInvoiceData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getAdvance', null,{})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.salaryheader2 = response.data;
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


    this.axiosService.request('DELETE', 'deleteAdvance', { advance_salary_id: id },{})
      .then(response => {

        this.fetchInvoiceData();
        console.log("Response from server:", response);

        alert("Advance deleted successfully!");



      })
      .catch(error => {
        console.error("Error deleting Allowance:", error);
        alert("Error deleting Allowance!");


      });
  }

  filterByEmployeeId() {

  }
}
