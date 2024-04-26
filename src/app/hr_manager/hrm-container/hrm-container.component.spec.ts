import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmContainerComponent } from './hrm-container.component';

describe('HrmContainerComponent', () => {
  let component: HrmContainerComponent;
  let fixture: ComponentFixture<HrmContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HrmContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HrmContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
