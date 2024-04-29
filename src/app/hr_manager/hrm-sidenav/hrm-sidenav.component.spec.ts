import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmSidenavComponent } from './hrm-sidenav.component';

describe('HrmSidenavComponent', () => {
  let component: HrmSidenavComponent;
  let fixture: ComponentFixture<HrmSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmSidenavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
