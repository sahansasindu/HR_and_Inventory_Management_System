import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../model/usermodel';
import { UserService } from '../../service/services/user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-manageuserprofile',
  templateUrl: './manageuserprofile.component.html',
  styleUrls: ['./manageuserprofile.component.css']
})
export class ManageuserprofileComponent implements OnInit {
  userProfileForm: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private userService: UserService, @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userProfileForm = this.createFormGroup(fb);
    console.log("form Bulder",this.fb);
    this.saveProfile();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFormState();
      this.userService.getUser().subscribe(user => {
        if (user) {
          this.updateForm(user);
          this.saveFormState();  // Ensure user data is saved whenever it's updated
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
      if (isPlatformBrowser(this.platformId)) {
        this.saveFormState();  // Explicitly save the form state when saving the profile
      }
      this.toggleEditMode();
    }
  }

  saveFormState() {
    if (isPlatformBrowser(this.platformId)) {
      const formValue = this.userProfileForm.value;
      localStorage.setItem('currentUser', JSON.stringify(formValue));
    }
  }

  loadFormState() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('currentUser');
      if (data) {
        console.log(data)
        this.userProfileForm.patchValue(JSON.parse(data), { emitEvent: false });
        const parsedData = JSON.parse(data);
        console.log("presentData",parsedData)
        this.userProfileForm.get('id')?.setValue(parsedData.id, { emitEvent: false });
        this.userProfileForm.get("employeeid")?.setValue(parsedData.employeeid, { emitEvent: false });
        this.userProfileForm.get("roles")?.setValue(parsedData.roles, { emitEvent: false });
      }
    }
  }

}
