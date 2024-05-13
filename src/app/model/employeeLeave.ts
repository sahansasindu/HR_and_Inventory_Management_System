export class EmployeeLeave {
  get employee_leave_id(): number {
    return this._employee_leave_id;
  }

  set employee_leave_id(value: number) {
    this._employee_leave_id = value;
  }

  get emp_id(): string {
    return this._emp_id;
  }

  set emp_id(value: string) {
    this._emp_id = value;
  }

  get leave_type(): string {
    return this._leave_type;
  }

  set leave_type(value: string) {
    this._leave_type = value;
  }

  get reson(): string {
    return this._reson;
  }

  set reson(value: string) {
    this._reson = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get start_time(): string {
    return this._start_time;
  }

  set start_time(value: string) {
    this._start_time = value;
  }

  get end_time(): string {
    return this._end_time;
  }

  set end_time(value: string) {
    this._end_time = value;
  }

  private _employee_leave_id:number=0;
  private _emp_id:string='';
  private _leave_type:string='';
  private _reson:string='';
  private _start_time:string='';
  private _end_time:string='';
  private _status:string='';
}
