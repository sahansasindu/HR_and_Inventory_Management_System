export class BottleStockForm {
  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }
  get totalBottle(): number {
    return this._totalBottle;
  }

  set totalBottle(value: number) {
    this._totalBottle = value;
  }



  private _totalBottle: number=0;
  private _date: string='';



}
