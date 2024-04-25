import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBasicsalaryformComponent } from './model-basicsalaryform.component';

describe('ModelBasicsalaryformComponent', () => {
  let component: ModelBasicsalaryformComponent;
  let fixture: ComponentFixture<ModelBasicsalaryformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelBasicsalaryformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelBasicsalaryformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
