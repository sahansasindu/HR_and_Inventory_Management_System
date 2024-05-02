import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";
import {isPlatformBrowser} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-milkproductionsection',
  templateUrl: './milkproductionsection.component.html',
  styleUrl: './milkproductionsection.component.css'
})
export class MilkproductionsectionComponent implements OnInit{


  updateForm: FormGroup;


  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {

    this.updateForm = new FormGroup({
      finished_id: new FormControl({value: '', disabled: true},Validators.required),
      amount: new FormControl(''),
      batch_code: new FormControl(''),
      finished_status: new FormControl('')
    });
  }

  displayedColumns: string[] = ['finished_id', 'amount','batch_code', 'finished_status', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;

  // this TableElement for Daily Finish goods table
  ELEMENT_DATA: TableElement[] = [

  ];


//this dataSource2 for production issue tables
  displayedColumns2: string[] = ['daily_issue_id', 'damage_amount','issue_name', 'emp_id','submit_date'];
  dataSource2 = new MatTableDataSource<TableElement2>([]);
  selectedRow2: TableElement2 | null = null;
  ELEMENT_DATA2:TableElement2[]=[

  ];

  async ngOnInit() {

    await this.fetchfinishedMilkBottleDetails();
    this.dataSource2.data = this.ELEMENT_DATA2;
    await this.fetchStatusOptions();
  }

  // Initially, the options array is empty
  statusOptions: StatusOption[] = [];
  async fetchStatusOptions(): Promise<void> {
    try {

      const response = await this.axiosService.request('GET', '/getIssueDetails', {}, {});

      this.statusOptions = response.data.map((item: any) => ({
        value: item.issue_id,
        text: item.issue_name
      }));
    } catch (error) {
      console.error(error);
    }
  }

  selectRow(row: TableElement): void {
    this.selectedRow = row;
  }

  selectRow2(row2: TableElement2): void {
    this.selectedRow2 = row2;
  }

  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view
  isProductionVisible:boolean=false;

  addEmployeeIssueDetailsVisible:boolean=false;
  updatechangeIsuesVisible:boolean=false;
  toggleProdctionIssuAdd(): void {
    this.addEmployeeIssueDetailsVisible = !this.addEmployeeIssueDetailsVisible;

    // Ensure update div is closed when opening add details
    if (this.addEmployeeIssueDetailsVisible) {
      this.updatechangeIsuesVisible = false;
    }
  }

  toggleProdctionChnages(): void {
    this.updatechangeIsuesVisible = !this.updatechangeIsuesVisible;

    // Ensure update div is closed when opening add details
    if (this.updatechangeIsuesVisible) {
      this.addEmployeeIssueDetailsVisible = false;
    }
  }


  //the method use for visible to the add details form
  toggleAddDetails(): void {
    this.isAddDetailsVisible = !this.isAddDetailsVisible;

    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
      this.isProductionVisible=false;
    }
  }
  toggleProdction(): void {
    this.isProductionVisible = !this.isProductionVisible;

    if (this.isProductionVisible) {
      this.isUpdateVisible = false;
      this.isAddDetailsVisible=false;
    }
  }
  toggleUpdate(): void {

    if (!this.selectedRow) {
      alert("No row selected")
      return;
    }

    this.updateForm.setValue({
      finished_id:this.selectedRow.finished_id,
      amount:this.selectedRow.amount,
      batch_code: this.selectedRow.batch_code,
      finished_status: this.selectedRow.finished_status,
    });

    this.isUpdateVisible = !this.isUpdateVisible;

    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
      this.isProductionVisible=false;
    }
  }

  //get finished good data to table
  private async fetchfinishedMilkBottleDetails() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const token = localStorage.getItem('currentUser');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      const response = await this.axiosService.request('GET', '/getDailyFinishedMilkBottle', {}, headers);
      this.dataSource.data = response.data;
      //console.log(response.data)
      this.ELEMENT_DATA=this.dataSource.data;
      console.log('Finish milk details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching Finish milk details:', error);
      //alert('Failed to fetch wash bottle details');
    }

  }


  //add daily finish kalkiri milks status
  async submitDailyFinished() {

    const token = localStorage.getItem('currentUser');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const add_finishedBottles = (document.getElementById('add_finishedBottles') as HTMLInputElement).value;
    const add_batch_code = (document.getElementById('add_batch_code') as HTMLInputElement).value;
    const add_status = (document.getElementById('add_status') as HTMLInputElement).value;
    const add_date = (document.getElementById('add_date') as HTMLInputElement).value;

    const finishedBottles = parseInt(add_finishedBottles);

    // Early validation to ensure all fields are filled
    if (isNaN(finishedBottles) || add_date === "" || add_batch_code==="" || add_status==="") {
      alert("Please Fill All Details");
      return;
    }

    const formDate = new Date((document.getElementById('add_date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'
    const currentTime = new Date();
    const formattedTime = currentTime.toTimeString().split(' ')[0]; // Gets 'HH:MM:SS'

    const formElement = new TableElement({
      amount:finishedBottles,
      batch_code: add_batch_code,
      finished_status: add_status,
      submit_date: formattedDate,
      submit_time: formattedTime
    });

    try {
      await this.axiosService.request("POST", "/adddailyfinishedmilk", formElement, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Submission successful");
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });
    } catch (error) {

      alert("Error submitting form");
      console.error('Error submitting form', error);
    }
    await this.fetchfinishedMilkBottleDetails();

  }


  //update changes for finished milk production
 async finishedupdateChanges() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('currentUser')}` };
    const formData = this.updateForm.getRawValue();

    console.log(formData)
    try {
      const response = await this.axiosService.request('PUT', '/updatefinishedMilk', formData, headers)
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            alert("Update successful")
            console.log('Update successful', response);
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {

          }
        });
      await this.fetchfinishedMilkBottleDetails();
    } catch (error) {
      alert("Error updating details")
      console.error('Error updating details', error);
    }

  }
}

export class TableElement {

  finished_id: number=0;
  amount: number=0;
  batch_code: string='';
  finished_status: string='';
  submit_date: string='';
  submit_time: string='';


  constructor(init?: Partial<TableElement>) {
    Object.assign(this, init);
  }


}

export class TableElement2 {

  daily_issue_id: number=0;
  damage_amount: number=0;
  issue_name: string='';
  emp_id: string='';
  submit_date:string='';

  constructor(init?: Partial<TableElement2>) {
    Object.assign(this, init);
  }
}
interface StatusOption {
  value: string;
  text: string;
}
