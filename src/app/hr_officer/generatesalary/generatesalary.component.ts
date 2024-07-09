
import {ChangeDetectorRef, Component} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-generatesalary',
  templateUrl: './generatesalary.component.html',
  styleUrl: './generatesalary.component.css'
})
export class GeneratesalaryComponent {
  isVisible1: boolean = true;
  isVisible2: boolean = true;
  isVisible3: boolean = false;

  dailypayroll: any[] = [];
  monthlysalary: any[] = [];
  filtereddata: any[] = [];
  filtereddata2: any[] = [];
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


  employeeId: any = '';
  employeeId1: any = '';
  selectedMonth: any = '';
  page: number = 1; // <-- current page

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  show() {
    this.isVisible1 = true;
    this.isVisible2 = true;
    this.isVisible3 = false;
  }

  show2() {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = true;
    this.fetchMonthlySalaryData();
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
    this.getmonthlysalaty(selectedEmployeeId, selectedMonth);

    this.empid="";

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
      Swal.fire({
        title: 'Success!',
        text: 'Payroll processed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

    }).catch(error => {
      console.error("Error processing payroll:", error);
      let errorMessage = "An error occurred while processing payroll. Please try again later.";
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });

    });
  }



  ngOnInit() {
    this.fetchDeductionData();
  }

  fetchDeductionData() {
    this.isLoading = true;
    this.axiosService.request('GET', 'geemployeedailypayroll', null, {})
      .then(response => {
        // console.log('Fetched data:', response.data); // Log the fetched data
        this.filtereddata = response.data;
        this.dailypayroll = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.dailypayroll); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }


  fetchMonthlySalaryData() {
    this.isLoading = true;
    this.axiosService.request('GET', 'getMonthlySalary', null, {})
      .then(response => {

        this.monthlysalary = response.data;
        this.isLoading = false;
        // Update Invoiceheader with the fetched data
        console.log(this.dailypayroll); // Corrected logging statement
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }




  private getmonthlysalaty(selectedEmployeeId: string, selectedMonth: string) {

  }

  pageChanged(event: number) {
    this.page = event;
  }

  filterByEmployeeId() {
    let filtered = this.filtereddata;

    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toString().toLowerCase();
      filtered = filtered.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }

    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-');
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === parseInt(year) && (itemDate.getMonth() + 1) === parseInt(month);
      });
    }

    this.dailypayroll = filtered;
  }

  filterByEmployeeId1() {
    let filtered = this.filtereddata2;

    if (this.employeeId) {
      const lowerCaseEmpId = this.employeeId.toString().toLowerCase();
      filtered = filtered.filter(item => item.emp_id.toString().toLowerCase() === lowerCaseEmpId);
    }

    if (this.selectedMonth) {
      const [year, month] = this.selectedMonth.split('-');
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === parseInt(year) && (itemDate.getMonth() + 1) === parseInt(month);
      });
    }

    this.monthlysalary = filtered;
  }



}
