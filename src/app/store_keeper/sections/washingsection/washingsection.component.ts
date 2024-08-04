import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isPlatformBrowser} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-washingsection',
  templateUrl: './washingsection.component.html',
  styleUrl: './washingsection.component.css'
})
export class WashingsectionComponent implements OnInit{

  updateForm: FormGroup;

  searchControl: FormControl;

  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {

    this.updateForm = new FormGroup({
      daily_damage_id: new FormControl({value: '', disabled: true},Validators.required),
      employee_id: new FormControl(''),
      damage_amount: new FormControl('')
    });

    this.searchControl = new FormControl('');
  }

  displayedColumns: string[] = ['daily_damage_id', 'damage_amount','employee_id','date'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;

  ELEMENT_DATA: TableElement[] = [

  ];

  ngOnInit() {

    this.dataSource.filterPredicate = (data: TableElement, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      return data.employee_id.toLowerCase().includes(transformedFilter);
    };

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });

    this.fetchdamageBottleDetails().then(r => {});

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRow(row: TableElement): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  isAddDetailsVisible: boolean = false;
  isUpdateVisible: boolean = false;

  //the method use for visible to the add details form
  toggleAddDetails(): void {
    this.isAddDetailsVisible = !this.isAddDetailsVisible;

    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
    }
  }

  toggleUpdate(): void {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Row Selected',
        text: 'Please select a row in the table.',
      });
      return;
    }

    this.updateForm.setValue({
      daily_damage_id:this.selectedRow.daily_damage_id,
      employee_id: this.selectedRow.employee_id,
      damage_amount: this.selectedRow.damage_amount,
    });

    this.isUpdateVisible = !this.isUpdateVisible;

    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
    }

    if(!this.isUpdateVisible){
      this.selectedRow=null;
    }
  }



  //using this method the storekeeper can add daily damages by employees during bottle washing
  async submitDailyDamages() {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const get_Empoyee_Id = (document.getElementById('add_employee_id') as HTMLInputElement).value;
    const get_Damage_Bottles = (document.getElementById('add_damage_amount') as HTMLInputElement).value;
    const get_Date = (document.getElementById('add_date') as HTMLInputElement).value;

    const damageBottles = parseInt(get_Damage_Bottles);

    // Early validation to ensure all fields are filled
    if (isNaN(damageBottles) || get_Date === "" || get_Empoyee_Id==="") {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please fill all details.',
      });
      return;
    }

    const formDate = new Date((document.getElementById('add_date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'


    const formElement = new TableElement({
      damage_amount: damageBottles,
      date: formattedDate,
      employee_id:get_Empoyee_Id,
      unit_type:"washing"
    });

    try {
      const response = await this.axiosService.request("POST", "/addDailyDamages", formElement, headers)
        .then(response => {

          if (response.data && response.data.message) {
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Your form has been submitted successfully!',
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Your form has been submitted successfully!',
            });

            //console.log('Submission successful', response);
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Your form has been submitted successfully!',
            });
          } else {

          }
        });
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Error Submitting Form',
        text: 'There was an error submitting the form. Please try again later.',
      });
    }
    await this.fetchdamageBottleDetails();
  }

  async damageupdateChanges() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('currentUser')}` };
    const formData = this.updateForm.getRawValue();

    console.log(formData)
    try {
      const response = await this.axiosService.request('PUT', '/updatedamageBottle', formData, headers)
    .then(response => {

        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Update Successful',
            text: 'The update was successful!',
          });
        }
      })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });
      await this.fetchdamageBottleDetails();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Details',
        text: 'There was an error updating details. Please try again later.',
      });
    }

  }

  private async fetchdamageBottleDetails() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('GET', '/getemployeeDamageBottle', {}, headers);
      this.dataSource.data = response.data;
      //console.log(response.data)
      this.ELEMENT_DATA=this.dataSource.data;
      console.log('wash bottle details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching wash bottle details:', error);
      //alert('Failed to fetch wash bottle details');
    }

  }

  clearsumbit() {
    (document.getElementById('add_employee_id') as HTMLInputElement).value='';
    (document.getElementById('add_damage_amount') as HTMLInputElement).value='';
    (document.getElementById('add_date') as HTMLInputElement).value='';
  }

  clearupdate() {
    (document.getElementById('employee_id') as HTMLInputElement).value='';
    (document.getElementById('damage_amount') as HTMLInputElement).value='';
  }
}

export class TableElement {

  daily_damage_id:number=0;
  damage_amount: number=0;
  date: string='';
  employee_id: string='';
  unit_type:string='';

  constructor(init?: Partial<TableElement>) {
  Object.assign(this, init);
}
}
