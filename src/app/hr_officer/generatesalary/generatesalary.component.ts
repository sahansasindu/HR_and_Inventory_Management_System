import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-generatesalary',
  templateUrl: './generatesalary.component.html',
  styleUrl: './generatesalary.component.css'
})
export class GeneratesalaryComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;



  show() {
    this.isVisible1 = true;
    this.isVisible2=false;


  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2=true;

  }


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
    this.axiosService.request('GET', 'getLeave', null,{})
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


  addloandetails() {
    this.router.navigate(['./add-deduction']);
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

  empid: any;
  stime: any;
  endtime: any;
  ltype: any;
  reason: any;
  astatus: any;

  submitData() {
    this.axiosService.request(
      "POST",
      "addLeave", {
        "end_time": this.endtime,
        "leave_type": this.ltype,
        "reson": this.reason,
        "start_time": this.stime,
        "status": this.astatus,
        "emp_id": this.empid
      }
    ,{}).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    });
  }


}
