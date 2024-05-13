import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/usermodel';
import { UserService } from '../../service/services/user.service';
import { isPlatformBrowser } from '@angular/common';
import { AxiosService } from "../../axios.service";

@Component({
  selector: 'app-manageuserprofile',
  templateUrl: './manageuserprofile.component.html',
  styleUrls: ['./manageuserprofile.component.css']
})
export class ManageuserprofileComponent implements OnInit {
  userProfileForm!: FormGroup;
  isEditMode = false;
  currentUser!: User; // Renamed to avoid shadowing

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private ax: AxiosService,
    private user :User
  ) {}

  ngOnInit() {
    this.userProfileForm = this.createFormGroup();
    if (isPlatformBrowser(this.platformId)) {
      this.loadFormState();
      this.userService.getUser().subscribe(user => {
        if (user) {
          this.currentUser = user; // Properly use the currentUser
          this.updateForm(user);
          this.user.id=user.id;
        }
      });
    }
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      id: [{ value: '', disabled: true }],
      username: [''],
      password: [''],
      email: [''],
      contact: ['']
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.userProfileForm.enable();
      this.userProfileForm.get('id')?.disable(); // Keep ID disabled
    } else {
      this.userProfileForm.disable();
    }
  }

  updateForm(user: User): void {
    this.userProfileForm.patchValue({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      contact: user.contact
    });
  }

  saveProfile() {
    if (this.userProfileForm.valid) {
      console.log('Profile saved:', this.userProfileForm.value);
      this.saveFormState();
      this.toggleEditMode();
    }
  }


  isValidEmail(email:string): boolean {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  }


  saveFormState() {
    if (isPlatformBrowser(this.platformId)) {
      const formValue = this.userProfileForm.value;
      const id = this.user.id;




      if (id) {
        const isEmptyField = Object.values(formValue).some(value => !value);
        if (isEmptyField) {
          alert("Please fill out all fields");
          return;
        }

        if(!this.isValidEmail(formValue.email)){
          alert("Please enter valid email");
          return;
        }
        this.ax.request(
          "PUT",
          "/updateUserProfile",
          {
            id: id,
            username: formValue.username,
            password: formValue.password,
            email: formValue.email,
            contact: formValue.contact
          }
        ).then(response => {
          // Handle successful response
          alert('Profile updated successfully');
          this.userService.setUser(response.data);
          this.updateForm(response.data);
          this.loadFormState();
        }).catch(error => {
          // Handle errors specifically
          if (error.response && error.response.data) {
            // Check if there's a specific message to display
            alert(error.response.data.message || "An error occurred while updating the user details.");
          } else {
            alert("An error occurred, and no specific details were provided.");
          }
        });
      } else {
        alert("User ID is null.");
      }
    }
  }

  loadFormState() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('currentUser');
      if (data) {
        const parsedData = JSON.parse(data);
        this.userProfileForm.patchValue(parsedData, { emitEvent: false });
      }
    }
  }
}
