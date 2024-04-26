import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmHeaderComponent } from './hrm-header.component';

describe('HrmHeaderComponent', () => {
  let component: HrmHeaderComponent;
  let fixture: ComponentFixture<HrmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
