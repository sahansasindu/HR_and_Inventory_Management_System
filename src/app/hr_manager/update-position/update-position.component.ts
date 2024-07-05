import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../axios.service";
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrl: './update-position.component.css'
})
export class UpdatePositionComponent implements OnInit {

  form: FormGroup;

  years: number[] = [];


  constructor(private axiosService: AxiosService, private fb: FormBuilder) {

    this.form = this.fb.group({
      employee_id: [''],
      job_role: [''],
      salary_type: [''],
      employee_name: [''],
      company_status: [''],
      department: [''],
      sec_id: [''],
      gender: ['']
    });

  }

  async ngOnInit() {

    this.JobPromotionUpdate.filterPredicate = (data: UpdatePromotion, filter: string) => {
      return data.employee_id.toLowerCase().includes(filter);
    };

    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 10; year <= currentYear + 10; year++) {
      this.years.push(year);
    }

    await this.getEmployeeToPromotionUpdate();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.JobPromotionUpdate.filter = filterValue.trim().toLowerCase();
  }


  displayedColumns: string[] = ['employee_id', 'job_role', 'salary_type', 'employee_name', 'company_status', 'department', 'sec_id'];
  JobPromotionUpdate = new MatTableDataSource<UpdatePromotion>([]);
  selectedRow: UpdatePromotion | null = null;

  ELEMENT_DATA: UpdatePromotion[] = [];

  selectRow(row: UpdatePromotion) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
      this.form.reset();
    } else {
      this.selectedRow = row;
      this.form.patchValue(row);
    }
  }

  //get employee details
  async getEmployeeToPromotionUpdate() {
    try {
      const response = await this.axiosService.request('GET', '/getEmployeeToPromotionUpdate', {}, {});
      this.JobPromotionUpdate.data = response.data;
      this.ELEMENT_DATA = this.JobPromotionUpdate.data;
      console.log('employee details fetched successfully.....', response.data);
    } catch (error) {
      console.error('Error fetching employee details details...', error);
    }
  }

  isvisibleAction: boolean = false;


  gotoView() {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.isvisibleAction = !this.isvisibleAction;

    if (!this.isvisibleAction) {
      this.selectedRow = null;
      this.form.reset();
    }

    this.Leaves = false;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = false;

  }

  getEmployeeImage(gender: string): string {
    return gender === 'male' ? '/assets/images/male.png' : '/assets/images/female.png';
  }

  Leaves: boolean = false;
  Medicals: boolean = false;
  Gate: boolean = false;
  Attendance: boolean = false;

  showDivLeaves() {

    this.Leaves = true;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = false;

  }

  showDivMedicals() {
    this.Leaves = false;
    this.Medicals = true;
    this.Gate = false;
    this.Attendance = false;
  }

  showDivGate() {
    this.Leaves = false;
    this.Medicals = false;
    this.Gate = true;
    this.Attendance = false;
  }

  showDivAttendance() {
    this.Leaves = false;
    this.Medicals = false;
    this.Gate = false;
    this.Attendance = true;
  }

  async getEmployeeCVbyID() {

    if (!this.selectedRow) {

      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });
      return;
    }
    const empid = this.selectedRow?.employee_id;

    try {
      const response = await this.axiosService.request2('GET', `/downloadCvReport/${empid}`, {}, {responseType: 'blob'});

      const contentType = response.headers['content-type'];
      let fileExtension = 'pdf';


      const url = window.URL.createObjectURL(new Blob([response.data], {type: contentType}));
      const a = document.createElement('a');
      a.href = url;
      a.download = `cv_${empid}.${fileExtension}`;
      a.click();

    } catch (error) {
      console.error('Error downloading CV Report:', error);
    }

  }

  months = [
    {value: 1, name: 'January'},
    {value: 2, name: 'February'},
    {value: 3, name: 'March'},
    {value: 4, name: 'April'},
    {value: 5, name: 'May'},
    {value: 6, name: 'June'},
    {value: 7, name: 'July'},
    {value: 8, name: 'August'},
    {value: 9, name: 'September'},
    {value: 10, name: 'October'},
    {value: 11, name: 'November'},
    {value: 12, name: 'December'}
  ];

  searchDetails() {
    const selectedMonthElement = document.getElementById('selectedMonth') as HTMLSelectElement;
    const selectedYearElement = document.getElementById('selectedYear') as HTMLSelectElement;

    const selectedMonth = selectedMonthElement.value;
    const selectedYear = selectedYearElement.value;

    if (!this.Leaves && !this.Attendance && !this.Gate && !this.Medicals) {
      Swal.fire({
        icon: 'warning',
        title: 'Select Any Button',
        text: "Please select an View details button.",
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (selectedMonth==="Month" || selectedYear==="Year") {
      Swal.fire({
        icon: 'warning',
        title: 'Select Month And Year',
        text: "Please select Month and Year to get employee details.",
        confirmButtonText: 'Ok'
      });
    }else {

    }
  }

  //for attendance chart
  chart: any;

  chartOptionsAttendance = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Stock Movement"
    },
    axisY: {
      title: "Stock in Hand"
    },
    data: [{
      type: "stepLine",
      dataPoints: [
        { x: new Date(2021, 0, 1), y: 1792 },
        { x: new Date(2021, 1, 1), y: 1326 },
        { x: new Date(2021, 2, 1), y: 1955 },
        { x: new Date(2021, 3, 1), y: 1727 },
        { x: new Date(2021, 4, 1), y: 1085 },
        { x: new Date(2021, 5, 1), y: 1523 },
        { x: new Date(2021, 6, 1), y: 1257 },
        { x: new Date(2021, 7, 1), y: 1520 },
        { x: new Date(2021, 8, 1), y: 1853 },
        { x: new Date(2021, 9, 1), y: 1738 },
        { x: new Date(2021, 10, 1), y: 1754 },
        { x: new Date(2021, 11, 1), y: 1624 }
      ]
    }]
  }

}
export interface UpdatePromotion {

  employee_id:string;
  job_role:string;
  salary_type:string;
  employee_name:string;
  company_status:string;
  department:string;
  sec_id:string;
  gender:string;

}
