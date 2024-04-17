import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AxiosService} from "../../../axios.service";

@Component({
  selector: 'app-milkproductionsection',
  templateUrl: './milkproductionsection.component.html',
  styleUrl: './milkproductionsection.component.css'
})
export class MilkproductionsectionComponent implements OnInit{

  constructor(private axiosService: AxiosService,@Inject(PLATFORM_ID) private platformId: Object) {
  }

  displayedColumns: string[] = ['finished_id', 'amount','batch_code', 'finished_status', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: TableElement | null = null;

  // this TableElemet for Daily Finish goods table
  ELEMENT_DATA: TableElement[] = [

  ];


//this dataSource2 for production issue tables
  displayedColumns2: string[] = ['DailyIssueID', 'damage_Amount_Issue','issue_Name', 'IssueEmployeeID'];
  dataSource2 = new MatTableDataSource<TableElement2>([]);
  selectedRow2: Element | null = null;

  ELEMENT_DATA2:TableElement2[]=[
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
    { DailyIssueID: 1, damage_Amount_Issue: 10,issue_Name: "B001", IssueEmployeeID: "1111" },
  ];

  ngOnInit() {

    this.fetchfinishedMilkBottleDetails().then(r => {});
    this.dataSource2.data = this.ELEMENT_DATA2;
    this.fetchStatusOptions();
  }

  // Initially, the options array is empty
  statusOptions: StatusOption[] = [];
  fetchStatusOptions(): void {
    this.statusOptions = [
      { value: '1', text: 'Issue1' },
      { value: '2', text: 'Issue2' },
      { value: '3', text: 'Issue3' },
      { value: '4', text: 'Issue4' },
      { value: '5', text: 'Issue5' },
      { value: '6', text: 'Issue6' },
      // Add more options as needed
    ];
  }

  selectRow(row: TableElement): void {
    this.selectedRow = row;
  }

  selectRow2(row2: Element): void {
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
    this.isUpdateVisible = !this.isUpdateVisible;

    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
      this.isProductionVisible=false;
    }
  }

  private async fetchfinishedMilkBottleDetails() {


  }


  //add daily finish kalkiri milks status
  async submitDailyFinished() {

    const token = localStorage.getItem('token');
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
      const response = await this.axiosService.request("POST", "/adddailyfinishedmilk", formElement, headers)
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

export interface TableElement2 {

  DailyIssueID: number;
  damage_Amount_Issue: number;
  issue_Name: String;
  IssueEmployeeID: String;
}
interface StatusOption {
  value: string;
  text: string;
}
