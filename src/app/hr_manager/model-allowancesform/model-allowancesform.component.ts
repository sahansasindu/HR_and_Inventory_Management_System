import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model-allowancesform',
  templateUrl: './model-allowancesform.component.html',
  styleUrls: ['./model-allowancesform.component.css']
})
export class ModelAllowancesformComponent {

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backAction: EventEmitter<void> = new EventEmitter();

  @Input() headerTitle: string = '';
  @Input() allowance_amount: any;
  @Input() depName: string = '';
  @Input() job_role: string = '';
  @Input() salary_type: string = '';
  @Input() section_name: string = '';
  @Input() allowance: string = '';
  @Input() allowance_type: string = '';

  constructor() {}

  back() {
    this.backAction.emit();
  }

  submitData(event: Event) {
    event.preventDefault();

    if (
      !this.allowance_amount ||
      !this.depName ||
      !this.job_role ||
      !this.salary_type ||
      !this.section_name ||
      !this.allowance_type
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {
      allowances_amount: this.allowance_amount,
      allowances_type: this.allowance_type,
      department_name: this.depName,
      job_role: this.job_role,
      salary_type: this.salary_type,
      section_name: this.section_name,
    };
    this.formSubmit.emit(formData);
  }
}
