export class BottleStockForm {


  private _totalBottle: number=0;
  private _date: string='';
  private _woshing:number=0;
  private _production:number=0;
  private _lording:number=0;


  get lording(): number {
    return this._lording;
  }

  set lording(value: number) {
    this._lording = value;
  }
  get production(): number {
    return this._production;
  }

  set production(value: number) {
    this._production = value;
  }
  get woshing(): number {
    return this._woshing;
  }

  set woshing(value: number) {
    this._woshing = value;
  }

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



}
