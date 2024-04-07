import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionmanageruserprofileComponent } from './productionmanageruserprofile.component';

describe('ProductionmanageruserprofileComponent', () => {
  let component: ProductionmanageruserprofileComponent;
  let fixture: ComponentFixture<ProductionmanageruserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionmanageruserprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionmanageruserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
