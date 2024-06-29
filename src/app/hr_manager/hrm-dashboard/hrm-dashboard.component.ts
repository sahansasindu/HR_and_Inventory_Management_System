import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrm-dashboard',
  templateUrl: './hrm-dashboard.component.html',
  styleUrl: './hrm-dashboard.component.css'
})
export class HrmDashboardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  cards = [
    { title: 'Company Total Employees', value: 200 },
    { title: 'Currently working Employees', value: 183 },
    { title: 'Today Absent Employees', value: 10 },
    { title: 'Today Short Leavers', value: 7 },
    { title: 'Currently Gate pass', value: 5 }
  ];

}
