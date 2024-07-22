import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model-basicsalaryform',
  templateUrl: './model-basicsalaryform.component.html',
  styleUrls: ['./model-basicsalaryform.component.css']
})
export class ModelBasicsalaryformComponent {

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backAction: EventEmitter<void> = new EventEmitter();

  @Input() headerTitle: string = '';
  @Input() basicamount: any;
  @Input() br1: any;
  @Input() br2: any;
  @Input() depName: string = '';
  @Input() gpass_amount: any;
  @Input() Initial_days: any;
  @Input() nopay_amount: any;
  @Input() job_role: string = '';
  @Input() ot_amount: any;
  @Input() salary_type: string = '';
  @Input() section_name: string = '';
  @Input() late_hours_amount: any;

  constructor() { }

  back() {
    this.backAction.emit();
  }

  submitData(event: Event) {
    event.preventDefault();

    if (
      !this.basicamount ||
      !this.depName ||
      !this.Initial_days ||
      !this.job_role ||
      !this.salary_type ||
      !this.section_name
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {
      basic_amount: this.basicamount,
      br_1: this.br1,
      br_2: this.br2,
      department_name: this.depName,
      get_pass_amount: this.gpass_amount,
      initial_days: this.Initial_days,
      initial_nopay_amount: this.nopay_amount,
      job_role: this.job_role,
      ot_amount: this.ot_amount,
      salary_type: this.salary_type,
      section_name: this.section_name,
      late_hours_amount: this.late_hours_amount,
    };

    this.formSubmit.emit(formData);
    this.clearForm();
  }

  clearForm() {
    this.basicamount = '';
    this.br1 = '';
    this.br2 = '';
    this.depName = '';
    this.gpass_amount = '';
    this.Initial_days = '';
    this.nopay_amount = '';
    this.job_role = '';
    this.ot_amount = '';
    this.salary_type = '';
    this.section_name = '';
    this.late_hours_amount = '';
  }
}
