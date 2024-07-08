import {Component, OnInit} from '@angular/core';
import {AxiosService} from "../../axios.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../model/usermodel";
import {MailServiceService} from "../../service/services/mail-service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";



@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit{

  id:number = 0;

  deleteUserGroup: FormGroup;

  constructor(private axservice:AxiosService,private sendMail: MailServiceService) {

    this.deleteUserGroup = new FormGroup({
      user_id: new FormControl({ value: '', disabled: true }, Validators.required),
      user_name: new FormControl({ value: '', disabled: true }, Validators.required),
      empID: new FormControl({ value: '', disabled: true }, Validators.required),
      user_email: new FormControl({ value: '', disabled: true }, Validators.required),
      role: new FormControl({ value: '', disabled: true }, Validators.required),
      contactNum: new FormControl({ value: '', disabled: true }, Validators.required),
      reason_status: new FormControl('', Validators.required)
    });

  }

  displayedColumns: string[] = ['id', 'username', 'email', 'contact', 'roles', 'employee'];
  dataSourceUser = new MatTableDataSource<TableElementUser>([]);

  ELEMENT_DATA_AGENT: TableElementUser[] = [];

  isCreateUser: boolean = false;
  isDeleteUser: boolean=false;



  async ngOnInit(): Promise<void> {

    this.dataSourceUser.filterPredicate = (data: TableElementUser, filter: string) => {
      return data.employee.toLowerCase().includes(filter);
    };
    await this.getAllUsers()
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceUser.filter = filterValue.trim().toLowerCase();
  }

  selectedRow: TableElementUser | null = null;

  selectRow(row: TableElementUser): void {
    this.selectedRow = this.selectedRow === row ? null : row;
  }


  swaptoCreateUser() {

    this.isCreateUser=!this.isCreateUser;
    if(this.isCreateUser){
      this.isDeleteUser=false;
    }

  }

  swaptoDeleteUser() {

    if (!this.selectedRow) {
      Swal.fire({
        icon: 'warning',
        title: 'No Row Selected',
        text: 'Please select a row in the table.',
      });
      return;
    }

    this.deleteUserGroup.setValue({
      user_id: this.selectedRow.id,
      user_name: this.selectedRow.username,
      empID: this.selectedRow.employee,
      user_email: this.selectedRow.email,
      role: this.selectedRow.roles,
      contactNum: this.selectedRow.contact,
      reason_status: ''
    });

    console.log(this.deleteUserGroup)

    this.isDeleteUser=!this.isDeleteUser;
    if(this.isDeleteUser){
      this.isCreateUser=false;
    }

    if(!this.isDeleteUser){
      this.selectedRow=null;
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
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all fields.',
      });
    } else if (createUse.username.length > 8 || createUse.username.length < 3) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Username Length',
        text: 'Please use between 3 and 8 characters for the username.',
      });
    } else if (createUse.password.length < 8 || createUse.password.length > 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Password Length',
        text: 'Please use between 5 and 8 characters for the password.',
      });
    } else if (!createUse.isValidEmail()) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email.',
      });
    } else if (!createUse.isValidPhoneNumber(createUse.contact)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number.',
      });
    }else if(createUse.contact.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Phone Number',
        text: 'Please enter a valid phone number.',
      });
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
          Swal.fire({
            icon: 'success',
            title: 'User Created',
            text: 'User created successfully!',
          });
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
          Swal.fire({
            icon: 'info',
            title: 'Error',
            text: error.response.data.message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while creating the user.',
          });
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
    } catch (error) {
      console.error('Error fetching User Details:', error);
    }

  }
  async deleteUser(): Promise<void> {
    let reason = (document.getElementById('reason_status') as HTMLInputElement).value;

    if (reason === "") {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Delete Reason',
        text: 'Please enter a valid delete reason.',
      });
      return;
    }

    const confirmed = await Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete User ${(document.getElementById('user_name') as HTMLInputElement).value}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {

      let userId = (document.getElementById('user_id') as HTMLInputElement).value;
      const token = localStorage.getItem('currentUser');
      const headers = {
        Authorization: `Bearer ${token}`
      };

      await this.axservice.request("POST", "/deleteUser", {
        userId: userId,
        deleteReason: reason
      }, headers).then(response => {
        if (response.data && response.data.message) {
          Swal.fire({
            icon: 'info',
            title: 'Response Message',
            text: response.data.message,
          });
          this.getAllUsers(); // Refresh the table data
          this.clearData();
        } else {
          Swal.fire({
            icon: 'success',
            title: 'User Deleted',
            text: 'User deleted successfully!',
          });
          this.getAllUsers(); // Refresh the table data
          this.clearData();
        }
      }).catch(error => {
        if (error.response && error.response.data && error.response.data.message) {

          Swal.fire({
            icon: 'info',
            title: 'Response Message',
            text: error.response.data.message,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the user.',
          });
        }
      });
    }
  }



  clearData() {
    (document.getElementById('reason_status') as HTMLInputElement).value='';
  }
}
export interface TableElementUser {
  id: number;
  username: string;
  employee: string;
  email: string;
  roles: string;
  contact: string;
}

