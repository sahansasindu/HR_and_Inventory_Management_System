import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-milkproductionsection',
  templateUrl: './milkproductionsection.component.html',
  styleUrl: './milkproductionsection.component.css'
})
export class MilkproductionsectionComponent implements OnInit{
  displayedColumns: string[] = ['finished_id', 'amunt_finished','batch_code', 'finished_status', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;

  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },
    { finished_id: 1, amunt_finished: 10,batch_code: "B001", finished_status: "GOOD", submit_date: new Date(), submit_time: new Date() },

    // ... more data
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
    this.dataSource.data = this.ELEMENT_DATA;
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

  selectRow(row: Element): void {
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

    // Ensure update div is closed when opening add details
    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
      this.isProductionVisible=false;
    }
  }
  toggleProdction(): void {
    this.isProductionVisible = !this.isProductionVisible;

    // Ensure update div is closed when opening add details
    if (this.isProductionVisible) {
      this.isUpdateVisible = false;
      this.isAddDetailsVisible=false;
    }
  }
  toggleUpdate(): void {
    this.isUpdateVisible = !this.isUpdateVisible;

    // Ensure add details div is closed when opening update
    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
      this.isProductionVisible=false;
    }
  }

  //get All Issue Types in the database

}

export interface TableElement {
  finished_id: number;
  amunt_finished: number;
  batch_code: String;
  finished_status: String;
  submit_date: Date;
  submit_time: Date;
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
