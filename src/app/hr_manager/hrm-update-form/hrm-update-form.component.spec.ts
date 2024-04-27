import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmUpdateFormComponent } from './hrm-update-form.component';

describe('HrmUpdateFormComponent', () => {
  let component: HrmUpdateFormComponent;
  let fixture: ComponentFixture<HrmUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmUpdateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
