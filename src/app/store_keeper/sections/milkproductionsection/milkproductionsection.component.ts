import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";
import {isPlatformBrowser} from "@angular/common";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-milkproductionsection',
  templateUrl: './milkproductionsection.component.html',
  styleUrl: './milkproductionsection.component.css'
})
export class MilkproductionsectionComponent implements OnInit{


  updateForm: FormGroup;

  updateForm2: FormGroup;


  searchControl: FormControl;

  selectedIssueTypeText: string = "";

  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {

    this.updateForm = new FormGroup({
      finished_id: new FormControl({value: '', disabled: true},Validators.required),
      amount: new FormControl(''),
      batch_code: new FormControl(''),
      finished_status: new FormControl('')
    });

    this.updateForm2 = new FormGroup({
      daily_issue_id: new FormControl({value: '', disabled: true},Validators.required),
      damage_amount: new FormControl(''),
      issue_name: new FormControl(''),
      emp_id: new FormControl(''),
    });

    this.searchControl = new FormControl('');
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

    await this.fetchfinishedMilkBottleDetails();
    await this.fetchStatusOptions();
    await this.gettAllIssueByEmployee();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Initially, the options array is empty
  statusOptions: StatusOption[] = [];
  async fetchStatusOptions(): Promise<void> {
    try {

      const response = await this.axiosService.request('GET', '/getIssueDetails', {}, {});

      this.statusOptions = response.data.map((item: any) => ({
        text: item.issue_name
      }));
    } catch (error) {
      console.error(error);
    }
  }

  selectRow(row: TableElement): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
    } else {
      this.selectedRow = row;
    }
  }

  selectRow2(row2: TableElement2): void {
    if (this.selectedRow2 === row2) {
      this.selectedRow2 = null;
    } else {
      this.selectedRow2 = row2;
    }
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

    if (!this.selectedRow2) {
      Swal.fire({
        icon: 'warning',
        title: 'No Row Selected',
        text: 'Please select a row in the table.',
      });
      return;
    }

    this.updateForm2.setValue({

      daily_issue_id:this.selectedRow2.daily_issue_id,
      damage_amount: this.selectedRow2.damage_amount,
      issue_name: this.selectedRow2.issue_name,
      emp_id: this.selectedRow2.emp_id
    });


    this.updatechangeIsuesVisible = !this.updatechangeIsuesVisible;

    // Ensure update div is closed when opening add details
    if (this.updatechangeIsuesVisible) {
      this.addEmployeeIssueDetailsVisible = false;
    }

    if(!this.updatechangeIsuesVisible){
      this.selectedRow2=null;
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
  async toggleProdction(){
    this.isProductionVisible = !this.isProductionVisible;
    await this.fetchfinishedMilkBottleDetails();

    if (this.isProductionVisible) {
      this.isUpdateVisible = false;
      this.isAddDetailsVisible=false;
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

    if(!this.isUpdateVisible){
      this.selectedRow=null;
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
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please fill all details.',
      });
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
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
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
    await this.fetchfinishedMilkBottleDetails();

  }


  //update changes for finished milk production
 async finishedupdateChanges() {

    const headers = { Authorization: `Bearer ${localStorage.getItem('currentUser')}` };
    const formData = this.updateForm.getRawValue();

    console.log(formData)
    try {
      await this.axiosService.request('PUT', '/updatefinishedMilk', formData, headers)
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
      await this.fetchfinishedMilkBottleDetails();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Details',
        text: 'There was an error updating details. Please try again later.',
      });
    }

  }

  updateSelectedIssueTypeText(event: any): void {

    const value = event.target.value;
    const selectedOption = this.statusOptions.find(option => option.text === value);
    this.selectedIssueTypeText = selectedOption?.text || "";

  }

  //add daily Issue by Employee
  async submitDailyIssueByEmployee():Promise<void> {


    const inputIssedamage = (document.getElementById('inputIssedamage') as HTMLInputElement).value;
    const inputIssuename = this.selectedIssueTypeText;
    const inputEmpID = (document.getElementById('inputEmpID') as HTMLInputElement).value;
    const issue_submit_date = (document.getElementById('issue_submit_date') as HTMLInputElement).value;

    console.log(inputIssuename)
    const IssueBottles = parseInt(inputIssedamage);

    if (isNaN(IssueBottles) || inputIssuename === "" || inputEmpID==="" || issue_submit_date==="") {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please fill all details.',
      });
      return;
    }

    const formDate = new Date((document.getElementById('issue_submit_date') as HTMLInputElement).value);
    const formattedDate = formDate.toISOString().split('T')[0]; // Gets 'YYYY-MM-DD'

    const formElement = new TableElement2({
      damage_amount:IssueBottles,
      issue_name: inputIssuename,
      emp_id: inputEmpID,
      submit_date: formattedDate,
    });

    try {
      await this.axiosService.request("POST", "/addDailyIssuesemployee", formElement, {})
        .then(response => {

          if (response.data && response.data.message) {
            alert(response.data.message);
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Submission Successful',
              text: 'Your form has been submitted successfully!',
            });
            this.gettAllIssueByEmployee();
          }
        })
        .catch(error => {

          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
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

  }

  async gettAllIssueByEmployee():Promise<void>{

    try {
      const response = await this.axiosService.request('GET', '/gettAllIssueByEmployee', {}, {});
      this.dataSource2.data = response.data;
      this.ELEMENT_DATA2=this.dataSource2.data;
      console.log(response)
    } catch (error) {
      console.log(error)
    }

  }

  async issueUpdateChanges() {

    const formData = this.updateForm2.getRawValue();


    try {
      await this.axiosService.request('PUT', '/updateIssueChanges', formData, {})
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
      await this.gettAllIssueByEmployee();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Details',
        text: 'There was an error updating details. Please try again later.',
      });
    }

  }

  cleardailyfinishedform() {

    (document.getElementById('add_finishedBottles') as HTMLInputElement).value='';
    (document.getElementById('add_batch_code') as HTMLInputElement).value='';
    (document.getElementById('add_status') as HTMLInputElement).value='';
    (document.getElementById('add_date') as HTMLInputElement).value='';

  }

  clearfinishedupdate() {

    (document.getElementById('amount') as HTMLInputElement).value='';
    (document.getElementById('batch_code') as HTMLInputElement).value='';
    (document.getElementById('finished_status') as HTMLInputElement).value='';


  }

  clearIssueDetails() {
    (document.getElementById('inputIssedamage') as HTMLInputElement).value='';
    (document.getElementById('inputIssuename') as HTMLInputElement).value='';
    (document.getElementById('inputEmpID') as HTMLInputElement).value='';
    (document.getElementById('issue_submit_date') as HTMLInputElement).value='';
  }

  clearIssueUpdate() {
    (document.getElementById('damage_amount') as HTMLInputElement).value='';
    (document.getElementById('issue_name') as HTMLInputElement).value='';
    (document.getElementById('emp_id') as HTMLInputElement).value='';
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
  text: string;
}
