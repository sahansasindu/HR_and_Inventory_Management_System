import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowancesComponent } from './allowances.component';

describe('AddAllowancesComponent', () => {
  let component: AllowancesComponent;
  let fixture: ComponentFixture<AllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllowancesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
