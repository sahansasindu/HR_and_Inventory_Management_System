import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-emptysection',
  templateUrl: './emptysection.component.html',
  styleUrl: './emptysection.component.css'
})
export class EmptysectionComponent implements OnInit{
  displayedColumns: string[] = ['empty_unit_id', 'empty_bottles','damage_bottles', 'for_washing', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, empty_bottles: 10,damage_bottles: 5, for_washing: 15, submit_date: new Date(), submit_time: new Date() },

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
  empty_unit_id: number;
  damage_bottles: number;
  empty_bottles: number;
  for_washing: number;
  submit_date: Date;
  submit_time: Date;
}
