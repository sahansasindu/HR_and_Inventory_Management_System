import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../axios.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrl: './update-position.component.css'
})
export class UpdatePositionComponent implements OnInit{

  constructor(private axiosService:AxiosService) {
  }

  async ngOnInit() {

    this.JobPromotionUpdate.filterPredicate = (data: UpdatePromotion, filter: string) => {
      return data.employee_id.toLowerCase().includes(filter);
    };

    await this.fetchEmptyBottleDetails();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.JobPromotionUpdate.filter = filterValue.trim().toLowerCase();
  }


  displayedColumns: string[] = ['employee_id', 'job_role','salary_type', 'employee_name', 'company_status', 'department','sec_id'];
  JobPromotionUpdate = new MatTableDataSource<UpdatePromotion>([]);
  selectedRow: UpdatePromotion | null = null;

  ELEMENT_DATA: UpdatePromotion[] = [

  ];

  selectRow(row: UpdatePromotion) {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  //get employee details
  async fetchEmptyBottleDetails() {
    try {
      const response = await this.axiosService.request('GET', '/getEmployeeToPromotionUpdate', {},{});
      this.JobPromotionUpdate.data = response.data;
      this.ELEMENT_DATA=this.JobPromotionUpdate.data;
      console.log('employee details fetched successfully.....', response.data);
    } catch (error) {
      console.error('Error fetching employee details details...', error);
    }
  }

  isvisibleAction :boolean=false;

  gotoView(action: string) {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Employee Selected',
        text: "Please select an employee's details by clicking on a table row.",
        confirmButtonText: 'Ok'
      });
      return;
    }

    this.isvisibleAction=!this.isvisibleAction;

    if(!this.isvisibleAction){
      this.selectedRow=null;
    }

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
