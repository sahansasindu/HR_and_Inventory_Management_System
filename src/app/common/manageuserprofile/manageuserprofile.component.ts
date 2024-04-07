
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../model/usermodel";
import { UserService } from "../../service/services/user.service";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-manageuserprofile',
  templateUrl: './manageuserprofile.component.html',
  styleUrls: ['./manageuserprofile.component.css']
})
export class ManageuserprofileComponent implements OnInit {
  userProfileForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userProfileForm = this.createFormGroup(fb);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.userService.getUser().subscribe(user => {
        if (user) {
          this.updateForm(user);
        }
      });
    }
  }

  createFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [{ value: '', disabled: true }],
      username: [{ value: '', disabled: true }],
      password: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      contact: [{ value: '', disabled: true }],
      roles: [{ value: '', disabled: true }],
      employeeid: [{ value: '', disabled: true }]
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
    const controls = ['id', 'employeeid', 'roles'];
    if (this.isEditMode) {
      this.userProfileForm.enable();
      controls.forEach(control => this.userProfileForm.get(control)?.disable());
    } else {
      this.userProfileForm.disable();
    }
  }

  private updateForm(user: User): void {
    this.userProfileForm.patchValue({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      contact: user.contact,
      roles: user.role,
      employeeid: user.empID
    });
  }
  saveProfile() {
    if (this.userProfileForm.valid) {
      console.log('Profile saved:', this.userProfileForm.value);
      // Adapt this part as needed to actually save the profile using UserService
      this.toggleEditMode();
    }
  }
}

