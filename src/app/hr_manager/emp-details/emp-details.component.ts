import { Component } from '@angular/core';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrl: './emp-details.component.css'
})
export class EmpDetailsComponent {
  employee: any = {
    name: 'Alisa Miller',
    id: '12345',
    gender: 'Female',
    age: 30,
    position: 'Employee',
    department: 'Bottle Washing',
    birthday: '1992-04-15'
  };
}
