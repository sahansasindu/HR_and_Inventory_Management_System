import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";

interface EmployeeBirthdayDTO {

  employee_id: string;
  job_role: string;
  employee_name: string;
  gender: string;
  contact: string;
  dep_id: string;
  sec_id: string;
}

export interface UpcomingBirthdayDTO {

  employee_id: string;
  job_role: string;
  employee_name: string;
  dob: Date;
  address: string;
  gender: string;
  ma_uma: string;
  contact: string;
  dep_id: string;
  sec_id: string;
}



@Component({
  selector: 'app-notificationcom',
  templateUrl: './notificationcom.component.html',
  styleUrl: './notificationcom.component.css'
})
export class NotificationcomComponent implements OnInit{



  currentTime: string='';
  private timeUpdateInterval: any;
  isBirthdayListVisible: boolean = false;
  employees: EmployeeBirthdayDTO[] = [];

  upcomingBirthdays: UpcomingBirthdayDTO[] = [];

  imageUrlMale: string = '/assets/images/male.png';
  imageUrlFemale: string = '/assets/images/female.png';
  isBirthdayListVisible2: boolean = false;



  constructor(private ax:AxiosService) { }

  async ngOnInit() {
    this.updateTime();
    this.timeUpdateInterval = setInterval(() => {
      this.updateTime();
    }, 1000);


    await this.fetchEmployeesWithBirthdaysToday();
  }

  //fetch data from the backend
  async fetchEmployeesWithBirthdaysToday(): Promise<void> {
    try {
      const response = await this.ax.request("GET","/todayBirthdays",{},{});
      this.employees = response.data;
      console.log('Employees with birthdays today:', this.employees);
    } catch (error) {
      console.error('Error fetching employees with birthdays today:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.timeUpdateInterval) {
      clearInterval(this.timeUpdateInterval); // Clear interval when component is destroyed
    }
  }

  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { hour12: true }) +
      '<br/>' +
      now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  clearNotifications(): void {
    // Logic to clear notifications
  }

  showBirthdayList(): void {
    this.isBirthdayListVisible = true;
  }

  hideBirthdayList(): void {
    this.isBirthdayListVisible = false;
  }

  async showUpcomingBirthdayList() {
    await this.fetchUpcomingBirthdays();
    this.isBirthdayListVisible2 = true;
  }

  hideBirthdayList2(): void {
    this.isBirthdayListVisible2 = false;
  }

  async fetchUpcomingBirthdays(): Promise<void> {
    try {
      const response = await this.ax.request("GET", "/upcomingBirthdays", {}, {});
      this.upcomingBirthdays = response.data.map((employee: UpcomingBirthdayDTO) => ({
        ...employee,
        dob: new Date(employee.dob)
      }));
      console.log('Upcoming Birthdays:', this.upcomingBirthdays);
    } catch (error) {
      console.error('Error fetching upcoming birthdays:', error);
    }
  }


  isTomorrow(dob: Date): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return dob.getDate() === tomorrow.getDate() && dob.getMonth() === tomorrow.getMonth();
  }

  isDayAfterTomorrow(dob: Date): boolean {
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    return dob.getDate() === dayAfterTomorrow.getDate() && dob.getMonth() === dayAfterTomorrow.getMonth();
  }

  //set value for Birth Day Colum
  getBirthdayStatus(dob: Date): string {
    if (this.isTomorrow(dob)) {
      return 'Tomorrow';
    } else if (this.isDayAfterTomorrow(dob)) {
      return 'Day after Tomorrow';
    } else {
      return '';
    }
  }

  //change colour and return ngClass
  getBirthdayStatusColor(dob: Date): string {
    if (this.isTomorrow(dob)) {
      return 'birthday-tomorrow';
    } else if (this.isDayAfterTomorrow(dob)) {
      return 'birthday-day-after-tomorrow';
    } else {
      return '';
    }
  }

}
