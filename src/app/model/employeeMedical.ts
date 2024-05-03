export class EmployeeMedical {
  get medical_report(): string {
    return this._medical_report;
  }

  set medical_report(value: string) {
    this._medical_report = value;
  }
  get submit_date(): string {
    return this._submit_date;
  }

  set submit_date(value: string) {
    this._submit_date = value;
  }
  get medical_status(): string {
    return this._medical_status;
  }

  set medical_status(value: string) {
    this._medical_status = value;
  }
  get emp_id(): string {
    return this._emp_id;
  }

  set emp_id(value: string) {
    this._emp_id = value;
  }
  get employee_medical_id(): number {
    return this._employee_medical_id;
  }

  set employee_medical_id(value: number) {
    this._employee_medical_id = value;
  }
  private _employee_medical_id:number=0;
  private _emp_id:string='';
  private _medical_status:string='';
  private _submit_date:string='';
  private _medical_report:string='';
}
