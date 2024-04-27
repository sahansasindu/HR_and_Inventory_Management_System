import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageproductionreportsComponent } from './manageproductionreports.component';

describe('ManageproductionreportsComponent', () => {
  let component: ManageproductionreportsComponent;
  let fixture: ComponentFixture<ManageproductionreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageproductionreportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageproductionreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
