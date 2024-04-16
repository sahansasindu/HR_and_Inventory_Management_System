
export class User {

  private _id:number;
  private _username: string;
  private _password: string;
  private _contact:string ;
  private _email:string;
  private _role:string;
  private _empID:string;
  private _token:string;

  constructor() {
    this._id = 0;
    this._username = '';
    this._password = '';
    this._contact = '';
    this._email = '';
    this._role = '';
    this._empID = '';
    this._token = '';
  }
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
  get empID(): string {
    return this._empID;
  }

  set empID(value: string) {
    this._empID = value;
  }
  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  get contact(): string {
    return this._contact;
  }

  set contact(value: string) {
    this._contact = value;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(this.email);
  }

  // Method to validate phone number
  isValidPhoneNumber(): boolean {
    const regex = /^\d+$/;
    return regex.test(this._contact);
  }
}
