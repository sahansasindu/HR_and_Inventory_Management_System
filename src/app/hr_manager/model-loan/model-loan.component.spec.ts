import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLoanComponent } from './model-loan.component';

describe('ModelLoanComponent', () => {
  let component: ModelLoanComponent;
  let fixture: ComponentFixture<ModelLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelLoanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
