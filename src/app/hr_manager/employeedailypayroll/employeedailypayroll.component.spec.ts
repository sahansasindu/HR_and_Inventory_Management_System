import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeedailypayrollComponent } from './employeedailypayroll.component';

describe('EmployeedailypayrollComponent', () => {
  let component: EmployeedailypayrollComponent;
  let fixture: ComponentFixture<EmployeedailypayrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeedailypayrollComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeedailypayrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
