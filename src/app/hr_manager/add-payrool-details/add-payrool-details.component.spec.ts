import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayroolDetailsComponent } from './add-payrool-details.component';

describe('AddPayroolDetailsComponent', () => {
  let component: AddPayroolDetailsComponent;
  let fixture: ComponentFixture<AddPayroolDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPayroolDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPayroolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
