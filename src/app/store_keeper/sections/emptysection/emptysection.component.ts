import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-emptysection',
  templateUrl: './emptysection.component.html',
  styleUrl: './emptysection.component.css'
})
export class EmptysectionComponent {
  displayedColumns: string[] = ['empty_unit_id', 'damage_bottles', 'empty_bottles', 'for_washing', 'submit_date', 'submit_time'];
  dataSource = new MatTableDataSource<TableElement>([]);
  selectedRow: Element | null = null;
  // You will replace this with your actual data
  ELEMENT_DATA: TableElement[] = [
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    { empty_unit_id: 1, damage_bottles: 5, empty_bottles: 10, for_washing: 15, submit_date: new Date(), submit_time: new Date() },
    // ... more data
  ];

  ngOnInit() {
    this.dataSource.data = this.ELEMENT_DATA;
  }

  selectRow(row: Element): void {
    this.selectedRow = row;
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
