import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDeductionformComponent } from './model-deductionform.component';

describe('ModelDeductionformComponent', () => {
  let component: ModelDeductionformComponent;
  let fixture: ComponentFixture<ModelDeductionformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelDeductionformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelDeductionformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
