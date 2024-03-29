import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-washingsection',
  templateUrl: './washingsection.component.html',
  styleUrl: './washingsection.component.css'
})
export class WashingsectionComponent implements OnInit{
  displayedColumns: string[] = ['employeeid', 'employeename','damage_bottles','submit_date'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },
    { employeeid: "EPF00001", employeename: "Kamal",damage_bottles: 5, submit_date: new Date() },


    // ... more data
  ];

  ngOnInit() {
    this.dataSource.data = this.ELEMENT_DATA;
  }

  selectRow(row: Element): void {
    this.selectedRow = row;
  }

  isAddDetailsVisible: boolean = false; // Used to toggle the add details view
  isUpdateVisible: boolean = false; // Used to toggle the update view

  //the method use for visible to the add details form
  toggleAddDetails(): void {
    this.isAddDetailsVisible = !this.isAddDetailsVisible;
    // Ensure update div is closed when opening add details
    if (this.isAddDetailsVisible) {
      this.isUpdateVisible = false;
    }
  }

  toggleUpdate(): void {
    this.isUpdateVisible = !this.isUpdateVisible;
    // Ensure add details div is closed when opening update
    if (this.isUpdateVisible) {
      this.isAddDetailsVisible = false;
    }
  }


}

export interface TableElement {
  employeeid: String;
  employeename: String;
  damage_bottles: number;
  submit_date: Date;
}
