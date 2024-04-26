import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-model-loan',
  templateUrl: './model-loan.component.html',
  styleUrl: './model-loan.component.css'
})
export class ModelLoanComponent {

  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() backAction: EventEmitter<void> = new EventEmitter();


  @Input() headerTitle: string = '';
  @Input()lempid:string = "";
  @Input()loandetails:string = "";
  @Input()lamount:string = "";
  @Input()liamount:string = "";



  constructor() {}

  back() {

    this.backAction.emit();
  }

  submitData(event: Event) {
    event.preventDefault();

    if (

      !this.lempid ||
      !this.lamount ||
      !this.liamount ||
      !this.loandetails


    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = {

      emp_id: this.lempid,
      loan_details: this.loandetails,
      loan_amount: this.lamount,
      interest_amount: this.liamount,


    };
    this.formSubmit.emit(formData);
  }

}
