import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../model/usermodel";
import {MailServiceService} from "../../service/services/mail-service.service";
import {Agent} from "../../model/agentmodel";
import {isPlatformBrowser} from "@angular/common";
import _default from "chart.js/dist/plugins/plugin.title";
import {UserService} from "../../service/services/user.service";



@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{

  id:number = 0;
  constructor(private userService: UserService , private axservice:AxiosService,private sendMail: MailServiceService) { }

  displayedColumns: string[] = ['id', 'username', 'email', 'contact', 'roles', 'employee'];
  dataSourceUser = new MatTableDataSource<User>([]);

  ELEMENT_DATA_AGENT: User[] = [

  ];

  isCreateUser: boolean = false;
  isDeleteUser: boolean=false;



  async ngOnInit(): Promise<void> {
    await this.getAllUsers()
  }


  swaptoCreateUser() {

    this.isCreateUser=!this.isCreateUser;
    if(this.isCreateUser){
      this.isDeleteUser=false;
    }

  }

  swaptoDeleteUser() {
    this.isDeleteUser=!this.isDeleteUser;
    if(this.isDeleteUser){
      this.isCreateUser=false;
    }
  }

  //create new User Account
 async registerNewUser():Promise<void> {
   const token = localStorage.getItem('currentUser');
   const headers = {
     Authorization: `Bearer ${token}`
   };

    let createUse=new User();

    createUse.username=(document.getElementById('username') as HTMLInputElement).value;
    createUse.email=(document.getElementById('email') as HTMLInputElement).value;
    createUse.contact=(document.getElementById('contact') as HTMLInputElement).value;
    createUse.role=(document.getElementById('roles') as HTMLInputElement).value;
    createUse.empID=(document.getElementById('employee') as HTMLInputElement).value;
    createUse.password=createUse.empID;
    if (createUse.username === "" || createUse.email === "" || createUse.contact === "" || createUse.role === "" || createUse.empID === "") {
      alert("Please Fill All Fields...");
    } else if (createUse.username.length > 8 || createUse.username.length < 3) {
      alert("Please use between 3 and 8 characters for the username...");
    } else if (createUse.password.length < 8 || createUse.password.length > 10) {
      alert("Please use between 8 and 10 characters for the password...");
    } else if (!createUse.isValidEmail()) {
      alert("Please enter a valid email...");
    } else if (!createUse.isValidPhoneNumber(createUse.contact)) {
      alert("Please enter a valid phone number...");
    }else if(createUse.contact.length < 10) {
      alert("Please enter a valid phone number...");
    }else {

      console.log(createUse)
      await this.axservice.request("POST", "/createNewUser", {
        "username": createUse.username,
        "password": createUse.password,
        "email": createUse.email,
        "contact": createUse.contact,
        "role": createUse.role,
        "employee": createUse.empID
      }, headers).then(response => {
        if (response.data && response.data.message) {
          alert(response.data.message);
        } else {

          alert("User created successfully!");
          this.getAllUsers();
          // After successful user registration
          this.sendMail.sendEmail({
            to: createUse.email,
            subject: `Account Created`,
            content:`Hi ${createUse.username}, your account has been created with username and password: UserName: ${createUse.username} Password: ${createUse.password}`
          });

        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred while registering the user.");
        }
      });
    }
  }

  //get All User Reord and set To Table
  async getAllUsers():Promise<any> {

    try {
      const response = await this.axservice.request('GET', '/getallUsers', {}, {});
      this.dataSourceUser.data = response.data; // <-- This line is causing the error
      this.ELEMENT_DATA_AGENT = this.dataSourceUser.data;
      console.log('User Details fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching User Details:', error);
    }

  }
  async deleteUser(id: number): Promise<void>{
    if (confirm(`Are you sure you want to delete user with ID ${id}?`)) {
      try {
        await this.userService.deleteUser(id).toPromise();
        alert(`User with ID ${id} deleted successfully.`);
        await this.getAllUsers(); // Refresh the user list after deletion
      } catch (error) {
        console.error(`Error deleting user: ${error}`);
        alert(`An error occurred while deleting the user.`);
      }
    }
  }

}
