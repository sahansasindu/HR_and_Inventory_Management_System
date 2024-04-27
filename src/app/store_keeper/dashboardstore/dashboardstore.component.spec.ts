import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardstoreComponent } from './dashboardstore.component';

describe('DashboardstoreComponent', () => {
  let component: DashboardstoreComponent;
  let fixture: ComponentFixture<DashboardstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardstoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
