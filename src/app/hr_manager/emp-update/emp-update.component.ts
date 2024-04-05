import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent {
  form: FormGroup;
  status = [
    "Married",
    "Unmarried",
  ]
  selected = "----"

  update({e}: { e: any }){
    this.selected = e.target.value
  }
  constructor(private fb: FormBuilder) {


    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      address: ['', Validators.required],
      age: ['', Validators.required],
      name: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      dob: ['', Validators.required],
      department: ['', Validators.required],
      contactNo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      // Handle form submission logic here
    }
  }
}
