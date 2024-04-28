export class ProductionIssue{
  get issue_name(): string {
    return this._issue_name;
  }

  set issue_name(value: string) {
    this._issue_name = value;
  }
  get issue_id(): number {
    return this._issue_id;
  }

  set issue_id(value: number) {
    this._issue_id = value;
  }
  private _issue_id:number=0;
  private _issue_name:string='';
}
