import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedepartmentComponent } from './updatedepartment.component';

describe('UpdatedepartmentComponent', () => {
  let component: UpdatedepartmentComponent;
  let fixture: ComponentFixture<UpdatedepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatedepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
