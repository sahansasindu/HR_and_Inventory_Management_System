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

  loandata: any[] = [];
  id: any;
  salaryheader: any[] = [];
  salaryheader2: any[] = [];
  selectedDepartment: string = "";
  isLoading: boolean = false;
  empid: any;
  stime: any;
  endtime: any;
  ltype: any;
  reason: any;
  astatus: any;
  isBonusChecked: boolean = false;
  bonusAmount: number | null = null;

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  show() {
    this.isVisible1 = true;
    this.isVisible2 = false;
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = true;
  }



  generateSalary() {
    const selectedEmployeeId = (document.getElementById('employeeId') as HTMLSelectElement).value;
    const selectedMonth = (document.getElementById('month') as HTMLInputElement).value;
    const bonus = this.isBonusChecked ? this.bonusAmount : null;

    console.log("Selected Employee ID:", selectedEmployeeId);
    console.log("Selected Month:", selectedMonth);
    console.log("Bonus Amount:", bonus);

    // Perform any further actions needed with the selected data
    this.attendanceforsalary(selectedEmployeeId, selectedMonth, bonus);
  }

  attendanceforsalary(empId: string, date: string, bonus: number | null) {
    let url = `/monthltysalary?empId=${empId}&date=${date}`;
    if (bonus !== null) {
      url += `&bonus=${bonus}`;
    }

    console.log(`Sending payroll request for empId: ${empId}, date: ${date}, bonus: ${bonus}`);

    this.axiosService.request(
      "POST",
      url,
      {}
    ).then(response => {
      console.log("Response from server:", response);
      alert("Payroll processed successfully!");
    }).catch(error => {
      console.error("Error processing payroll:", error);
      let errorMessage = "An error occurred while processing payroll. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    });
  }



  filterByDepartment() {
    console.log(this.selectedDepartment);

    if (this.selectedDepartment == "All") {
      this.fetchDeductionData();
    } else {
      this.loandata = this.salaryheader2;
      this.salaryheader = this.loandata.filter(item => item.department_name === this.selectedDepartment);
      this.loandata = this.salaryheader;
    }
  }

  ngOnInit() {
    this.fetchDeductionData();
  }

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', 'getLeave', null, {})
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
    this.router.navigate(['deductionupdate', id]);
  }

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
      , {}).then(response => {
      console.log("Response from server:", response);
      alert("User details updated successfully!");
    }).catch(error => {
      console.error("Error updating user details:", error);
      alert("Error updating user details. Please try again.");
    });
  }
}
