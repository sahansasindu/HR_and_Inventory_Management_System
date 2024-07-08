import {Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";
import { isPlatformBrowser } from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
@Component({
  selector: 'app-emptysection',
  templateUrl: './emptysection.component.html',
  styleUrl: './emptysection.component.css'
})
export class EmptysectionComponent implements OnInit{

  searchControl: FormControl;
  updateForm: FormGroup;
  isLoading: boolean = false;
  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {

    this.updateForm = new FormGroup({
      id: new FormControl({value: '', disabled: true},Validators.required),
      empty_bottles: new FormControl(''),
      damage_bottles: new FormControl('')
    });

    this.searchControl = new FormControl('');
  }


  displayedColumns: string[] = ['id', 'empty_bottles','damage_bottles', 'for_washing', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [

  ];

  async ngOnInit() {

    this.dataSource.filterPredicate = (data: TableElement, filter: string) => {
      const formattedDate = new Date(data.submit_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return formattedDate.includes(transformedFilter);
    };

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value);
    });

    await this.fetchEmptyBottleDetails();
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

  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view

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
        title: 'No row selected',
        text: 'Please select a row in the table',
      });
      return;
    }

    this.updateForm.setValue({
      id:this.selectedRow.id,
      empty_bottles: this.selectedRow.empty_bottles,
      damage_bottles: this.selectedRow.damage_bottles,
    });

    this.isUpdateVisible = !this.isUpdateVisible;

    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;

    }
    if(!this.isUpdateVisible){
      this.selectedRow=null;
    }
  }


  //this method for add new empty bottle stoke from agents
  async submitDailyEmpty() {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const emptyBottlesValue = (document.getElementById('emptyBottles') as HTMLInputElement).value;
    const damageBottlesValue = (document.getElementById('damagedBottles') as HTMLInputElement).value;
    const dateValue = (document.getElementById('date') as HTMLInputElement).value;

    const emptyBottles = parseInt(emptyBottlesValue);
    const damageBottles = parseInt(damageBottlesValue);

    // Early validation to ensure all fields are filled
    if (isNaN(emptyBottles) || isNaN(damageBottles) || dateValue === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Please Fill All Details',
        text: 'Ensure all required fields are completed.',
      });
      return;
    }
    if(emptyBottles<damageBottles){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Empty bottles cannot be less than damaged bottles.',
      });
      return;
    }

    const formDate = new Date((document.getElementById('date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'
    console.log(formattedDate)
    const currentTime = new Date();
    const formattedTime = currentTime.toTimeString().split(' ')[0]; // Gets 'HH:MM:SS'

    const formElement = new TableElement({
      empty_bottles: emptyBottles,
      damage_bottles: damageBottles,
      for_washing: emptyBottles - damageBottles,
      submit_date: formattedDate,
      submit_time: formattedTime
    });

    try {
      const response = await this.axiosService.request("POST", "/adddailyemptybottles", formElement, headers);
      Swal.fire({
        icon: 'success',
        title: 'Submission Successful',
        text: 'Your form has been submitted successfully!',
      });
      await this.fetchEmptyBottleDetails();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Submitting Form',
        text: 'There was an error submitting the form. Please try again later.',
      });
    }
  }

  clearemptybottleform() {
    (document.getElementById('emptyBottles') as HTMLInputElement).value = '';
    (document.getElementById('damagedBottles') as HTMLInputElement).value = '';
    (document.getElementById('date') as HTMLInputElement).value = '';

  }

  async fetchEmptyBottleDetails() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.isLoading = true;
    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('GET', '/getEmptyBottle', {}, headers);
      this.dataSource.data = response.data;
      //console.log(response.data)
      this.ELEMENT_DATA=this.dataSource.data;
      this.isLoading = false;
      console.log('Empty bottle details fetched successfully:', response.data);
    } catch (error) {
      this.isLoading = false;
      console.error('Error fetching empty bottle details:', error);
    }
  }

  async updateChanges() {

    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const formData = this.updateForm.getRawValue();

    console.log(formData)
    try {
      const response = await this.axiosService.request('PUT', '/updateEmptyBottle', formData, headers);
      Swal.fire({
        icon: 'success',
        title: 'Update Successful',
        text: 'The record has been updated successfully!',
      });
      await this.fetchEmptyBottleDetails();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Details',
        text: 'There was an error updating the details. Please try again later.',
      });

    }
  }

  clearupdate() {
    (document.getElementById('empty_bottles') as HTMLInputElement).value = '';
    (document.getElementById('damage_bottles') as HTMLInputElement).value = '';
  }
}

export class TableElement {

  id: number=0;
  damage_bottles: number=0;
  empty_bottles: number=0;
  for_washing: number=0;
  submit_date:string='';
  submit_time:string='';


  constructor(init?: Partial<TableElement>) {
    Object.assign(this, init);
  }

}
