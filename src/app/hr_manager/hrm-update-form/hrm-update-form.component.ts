import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hrm-update-form',
  templateUrl: './hrm-update-form.component.html',
  styleUrl: './hrm-update-form.component.css'
})
export class HrmUpdateFormComponent {
  employee = {
    employeeName: '',
    employeeId: '',
    age: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    maritalStatus: '',
    department: '',
    section: '',
    occupation: '',
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
    });
  }

  // sideBarToggler() {
  //   this.sideBarOpen = !this.sideBarOpen;
  // }

  onSubmit() {
    // Handle the form submission, such as updating the employee details
  this.router.navigate(['/hrmupdateemployeedetails']);
  }

onBack() {
  this.router.navigate(['/hrmupdateemployeedetails']);
}
}
