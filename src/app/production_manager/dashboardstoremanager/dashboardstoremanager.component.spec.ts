import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardstoremanagerComponent } from './dashboardstoremanager.component';

describe('DashboardstoremanagerComponent', () => {
  let component: DashboardstoremanagerComponent;
  let fixture: ComponentFixture<DashboardstoremanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardstoremanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardstoremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
