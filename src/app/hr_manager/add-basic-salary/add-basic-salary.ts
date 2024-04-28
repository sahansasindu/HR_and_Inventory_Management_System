import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-basic-salary',
  templateUrl: './add-basic-salary.html',
  styleUrls: ['./add-basic-salary.css']
})
export class AddBasicSalary implements OnInit {
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
    this.axiosService.request('GET', '/getSalary', null,{})
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
    this.router.navigate(['./addSalary']);
  }


  Update(id: any) {
    this.router.navigate(['updateSalary',id]);
  }




  Delete(id: any) {


    this.axiosService.request('DELETE', 'deleteSalary', { basic_salary_id: id },{})
      .then(response => {

        this.fetchInvoiceData();
        console.log("Response from server:", response);

        alert("Salary deleted successfully!");



      })
      .catch(error => {
        console.error("Error deleting salary:", error);
        alert("Error deleting salary!");


      });
  }

}
