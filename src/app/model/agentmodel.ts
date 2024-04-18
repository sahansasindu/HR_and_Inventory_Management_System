export class Agent {

  private _agent_id: string='';
  private _address: string='';
  private _agency_name: string='';
  private _agent_name: string='';
  private _contact_number: string='';
  private _email: string='';

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
  get contact_number(): string {
    return this._contact_number;
  }

  set contact_number(value: string) {
    this._contact_number = value;
  }
  get agent_name(): string {
    return this._agent_name;
  }

  set agent_name(value: string) {
    this._agent_name = value;
  }
  get agency_name(): string {
    return this._agency_name;
  }

  set agency_name(value: string) {
    this._agency_name = value;
  }
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
  get agent_id(): string {
    return this._agent_id;
  }

  set agent_id(value: string) {
    this._agent_id = value;
  }

  isValidEmail(): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(this.email);
  }

  // Method to validate phone number
  isValidPhoneNumber(): boolean {
    const regex = /^\d+$/;
    return regex.test(this.contact_number);
  }
}
