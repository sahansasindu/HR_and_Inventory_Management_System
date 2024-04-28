import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasicSalary } from './add-basic-salary';

describe('ManageDpayrollComponent', () => {
  let component: AddBasicSalary;
  let fixture: ComponentFixture<AddBasicSalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBasicSalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBasicSalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
