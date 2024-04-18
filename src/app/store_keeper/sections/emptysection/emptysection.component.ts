import {Component, OnInit,Inject, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";
import { isPlatformBrowser } from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-emptysection',
  templateUrl: './emptysection.component.html',
  styleUrl: './emptysection.component.css'
})
export class EmptysectionComponent implements OnInit{

  updateForm: FormGroup;
  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {

    this.updateForm = new FormGroup({
      id: new FormControl({value: '', disabled: true},Validators.required),
      empty_bottles: new FormControl(''),
      damage_bottles: new FormControl('')
    });
  }


  displayedColumns: string[] = ['id', 'empty_bottles','damage_bottles', 'for_washing', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [

  ];

  ngOnInit() {
    this.fetchEmptyBottleDetails().then(r =>{} );
  }

  selectRow(row: TableElement): void {
    this.selectedRow = row;
    console.log(this.selectedRow);

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
      alert("No row selected")
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
      alert("Please Fill All Details");
      return;
    }
    if(emptyBottles<damageBottles){
      alert("Invalid Input");
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
      alert("Submission successful");
      console.log('Submission successful', response);
      await this.fetchEmptyBottleDetails();
    } catch (error) {
      alert("Error submitting form");
      console.error('Error submitting form', error);
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

    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('GET', '/getEmptyBottle', {}, headers);
      this.dataSource.data = response.data;
      //console.log(response.data)
      this.ELEMENT_DATA=this.dataSource.data;
      console.log('Empty bottle details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching empty bottle details:', error);
      alert('Failed to fetch empty bottle details');
    }
  }

  async updateChanges() {

    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const formData = this.updateForm.getRawValue();

    console.log(formData)
    try {
      const response = await this.axiosService.request('PUT', '/updateEmptyBottle', formData, headers);
      alert("Update successful")
      console.log('Update successful', response);
      await this.fetchEmptyBottleDetails();
    } catch (error) {
      alert("Error updating details")
      console.error('Error updating details', error);

    }
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
