import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChartComponent } from './employee-chart.component';

describe('EmployeeChartComponent', () => {
  let component: EmployeeChartComponent;
  let fixture: ComponentFixture<EmployeeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
