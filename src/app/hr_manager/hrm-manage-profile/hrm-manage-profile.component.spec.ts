import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmManageProfileComponent } from './hrm-manage-profile.component';

describe('HrmManageProfileComponent', () => {
  let component: HrmManageProfileComponent;
  let fixture: ComponentFixture<HrmManageProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmManageProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
