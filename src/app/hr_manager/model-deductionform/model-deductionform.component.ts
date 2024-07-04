import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-model-deductionform',
  templateUrl: './model-deductionform.component.html',
  styleUrls: ['./model-deductionform.component.css']
})
export class ModelDeductionformComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backAction: EventEmitter<void> = new EventEmitter();

  @Input() headerTitle: string = '';
  @Input() deductionamount: any;
  @Input() depName: string = '';
  @Input() job_role: string = '';
  @Input() salary_type: string = '';
  @Input() section_name: string = '';
  @Input() deduction_type: string = '';

  constructor() {}

  back() {
    this.backAction.emit();
  }

  submitData(event: Event) {
    event.preventDefault();

    if (
      !this.deductionamount ||
      !this.depName ||
      !this.job_role ||
      !this.salary_type ||
      !this.section_name ||
      !this.deduction_type
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {
      deduction_amount: this.deductionamount,
      deduction_type: this.deduction_type,
      department_name: this.depName,
      job_role: this.job_role,
      salary_type: this.salary_type,
      section_name: this.section_name,
    };
    this.formSubmit.emit(formData);
    this.clearForm();
  }

  clearForm() {
   this.depName="";
   this.job_role="";
   this.salary_type="";
   this.section_name="";
   this.deduction_type="";
   this.deductionamount=null;

  }
}
