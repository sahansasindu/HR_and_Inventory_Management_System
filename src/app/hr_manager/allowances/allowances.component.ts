import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-allowances',
  templateUrl: './allowances.component.html',
  styleUrl: './allowances.component.css'
})
export class AllowancesComponent {
  salarydata: any[] = [];
  id: any;



  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}

  filterByDepartment() {
    console.log(this.selectedDepartment)


    if(this.selectedDepartment=="All"){
      this.fetchInvoiceData();
    }else{
      this.salarydata=this.salaryheader2;
      this.salaryheader = this.salarydata.filter(item => item.department_name === this.selectedDepartment);
      this.salarydata=this.salaryheader;
    }


  }
  ngOnInit() {
    this.fetchInvoiceData();
  }

  fetchInvoiceData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getAllowance', null,{})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.salaryheader2 = response.data;
        this.salarydata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.salarydata); // Corrected logging statement



      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }


  addpayrolldetails() {
    this.router.navigate(['./add-allowances']);
  }


  Update(id: any) {
    this.router.navigate(['UpdateAllowance',id]);
  }




  Delete(id: any) {


    this.axiosService.request('DELETE', 'deleteAllowance', { allowances_id: id },{})
      .then(response => {

        this.fetchInvoiceData();
        console.log("Response from server:", response);

        alert("Allowance deleted successfully!");



      })
      .catch(error => {
        console.error("Error deleting Allowance:", error);
        alert("Error deleting Allowance!");


      });
  }

}

