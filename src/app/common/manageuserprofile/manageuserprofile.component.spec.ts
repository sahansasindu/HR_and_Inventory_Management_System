import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageuserprofileComponent } from './manageuserprofile.component';

describe('ManageuserprofileComponent', () => {
  let component: ManageuserprofileComponent;
  let fixture: ComponentFixture<ManageuserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageuserprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageuserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
