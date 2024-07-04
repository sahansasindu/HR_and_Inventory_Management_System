import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-deduction',
  templateUrl: './deduction.component.html',
  styleUrl: './deduction.component.css'
})
export class DeductionComponent implements OnInit {
  deductiondata: any[] = [];
  id: any;



  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  page: number = 1; // <-- current page
  constructor(private axiosService: AxiosService,private router: Router,private cdr: ChangeDetectorRef) {}

  filterByDepartment() {
    console.log(this.selectedDepartment)


    if(this.selectedDepartment=="All"){
      this.fetchDeductionData();
    }else{
      this.deductiondata=this.salaryheader2;
      this.salaryheader = this.deductiondata.filter(item => item.department_name === this.selectedDepartment);
      this.deductiondata=this.salaryheader;
    }


  }
  ngOnInit() {
    this.fetchDeductionData();
  }

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getDeduction', null,{})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.salaryheader2 = response.data;
        this.deductiondata = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.deductiondata); // Corrected logging statement



      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }


  adddeductiondetails() {
    this.router.navigate(['./add-deduction']);
  }


  Update(id: any) {
    this.router.navigate(['deductionupdate',id]);
  }




  Delete(id: any) {

    if (confirm('Are you sure you want to delete this deduction?')) {
      this.axiosService.request('DELETE', 'deleteDeduction', {deduction_id: id}, {})
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
  pageChanged(event: number) {
    this.page = event;
  }


}
