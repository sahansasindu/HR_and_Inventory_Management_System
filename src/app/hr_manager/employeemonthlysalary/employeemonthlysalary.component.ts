import { ChangeDetectorRef, Component } from '@angular/core';
import { AxiosService } from "../../axios.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employeemonthlysalary',
  templateUrl: './employeemonthlysalary.component.html',
  styleUrls: ['./employeemonthlysalary.component.css']
})
export class EmployeemonthlysalaryComponent {
  id: any;
  advancedata: any[] = [];
  filtereddata: any[] = [];
  isLoading: boolean = false;
  employeeId: any = '';
  selectedMonth: any = '';
  page: number = 1; // <-- current page

  constructor(private axiosService: AxiosService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchAdvance();
  }

  fetchAdvance() {
    this.isLoading = true;
    this.axiosService.request('GET', '/getMonthlySalary', null, {})
      .then(response => {
        this.filtereddata = response.data;
        this.advancedata = response.data;
        this.isLoading = false;
        console.log(this.advancedata);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      });
  }

  Back() {
    this.router.navigate(['./hrmcontainer/esc']);
  }

  Update(id: any) {
    this.router.navigate(['update-advance', id]);
  }

  Delete(id: any) {
    if (confirm('Are you sure you want to delete this deduction?')) {
      this.axiosService.request('DELETE', 'deleteAdvance', { advance_salary_id: id }, {})
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

    this.advancedata = filtered;
  }

  pageChanged(event: number) {
    this.page = event;
  }
}