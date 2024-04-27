import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkproductionsectionComponent } from './milkproductionsection.component';

describe('MilkproductionsectionComponent', () => {
  let component: MilkproductionsectionComponent;
  let fixture: ComponentFixture<MilkproductionsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MilkproductionsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MilkproductionsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
