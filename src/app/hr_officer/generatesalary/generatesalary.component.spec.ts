import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratesalaryComponent } from './generatesalary.component';

describe('GeneratesalaryComponent', () => {
  let component: GeneratesalaryComponent;
  let fixture: ComponentFixture<GeneratesalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratesalaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneratesalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
