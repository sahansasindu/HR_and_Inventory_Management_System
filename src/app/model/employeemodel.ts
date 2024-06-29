export class Employee {

  constructor(
    public employeeid: string,
    public job_role: string,
    public salary_type: string,
    public employee_name: string,
    public dob: string,
    public address: string,
    public gender: string,
    public ma_uma: string,
    public contact: string,
    public company_status: string,
    public dep_id: string,
    public sec_id: string,
    public cv: File | null
  ) {}
}
