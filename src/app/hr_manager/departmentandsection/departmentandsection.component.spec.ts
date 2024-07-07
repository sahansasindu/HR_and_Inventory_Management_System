import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentandsectionComponent } from './departmentandsection.component';

describe('DepartmentandsectionComponent', () => {
  let component: DepartmentandsectionComponent;
  let fixture: ComponentFixture<DepartmentandsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentandsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentandsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
