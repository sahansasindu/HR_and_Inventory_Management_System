import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-advance',
  templateUrl: './add-advance.component.html',
  styleUrl: './add-advance.component.css'
})
export class AddAdvanceComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = false;
  isVisible3: boolean = false;



  empid: string = "";
  amount: any;
  reson: any;
  astatus: any;

  employeeId: any;

  filteredData: any[] = [];
  filterpart1: any[]=[];
  loarddata1: any[] = [];

  loarddata: any[] = [];
  filteredData2: any[] = [];
  filterpart2: any[]=[];




  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.employeeId="";

  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
    this.isVisible3 = false;
    this.fetchDeductionData();
    this.employeeId="";


  }

  show3() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this. fetchDeductionData2();
    this.employeeId="";

  }



  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {
  }


  filterByEmployeeId() {

    if (this.employeeId === "") {
      this.fetchDeductionData();
      this. fetchDeductionData2();

    } else {
      this.loarddata1=this.filteredData;
      const lowerCaseEmpId = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.filterpart1 = this.loarddata1.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
      console.log("Filtered data:", this.filteredData); // Check filtered data
      this.loarddata1=this.filterpart1;


      this.loarddata=this.filteredData2;
      const lowerCaseEmpId2 = this.employeeId ? this.employeeId.toString().toLowerCase() : '';
      this.filterpart2 = this.loarddata.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId2);
      this.loarddata=this.filterpart2;


    }
  }


  ngOnInit() {
    this.fetchDeductionData();
    this.fetchDeductionData2();
  }

  fetchDeductionData() {
    this.axiosService.request('GET', '/getAdvance', null,{})
      .then(response => {
        this.loarddata1 = response.data;
        this.filteredData =response.data;
        console.log(this.loarddata1); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


  submitData1() {
    console.log(this.empid);
    this.axiosService.request(
      "POST",
      "addAdvance", {
        "emp_id": this.empid,
        "amount": this.amount,
        "reson": this.reson,
        "status": this.astatus,

      }
      ,{}).then(response => {
      console.log("Response from server:", response);
      alert("Add advance successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      let errorMessage = "An error occurred while updating user details. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });

    this.empid="";
    this.amount="";
    this.reson="";
    this.astatus="";
  }


  fetchDeductionData2() {
    this.axiosService.request('GET', '/getLoan', null,{})
      .then(response => {
        this.loarddata = response.data;
        this.filteredData2=response.data;
        console.log(this.loarddata1);
      })
      .catch(error => {
        console.error('Error fetching data:', error);


      });
  }


}

