import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-salary',
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.css']
})
export class EmployeeSalaryComponent implements OnInit {
  isVisible1: boolean = true;
  isVisible2: boolean = false;


  constructor(private router: Router) {}

  ngOnInit() {}

  card1() {

    this.router.navigate(['./mdc']); // Navigate to 'esc/mdc' route
  }

  card2() {
   this.hidedive();
  }

  card3() {
    console.log("Work for Card 3");
  }

  card4() {
    this.router.navigate(['./loan']);
  }

  hidedive() {
    this.isVisible1 = false;
    this.isVisible2=true;
  }

  card5() {

    this.router.navigate(['./mdc']);

  }

  card6() {

    this.router.navigate(['./deduction']);

  }

  card7() {

    this.router.navigate(['./allowance']);

  }

  card8() {

    this.isVisible1 = true;
    this.isVisible2=false;

  }

  card9() {
    this.router.navigate(['./salaryadvance']);
  }
}
