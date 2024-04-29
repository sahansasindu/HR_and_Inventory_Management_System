import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WashingsectionComponent } from './washingsection.component';

describe('WashingsectionComponent', () => {
  let component: WashingsectionComponent;
  let fixture: ComponentFixture<WashingsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WashingsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WashingsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
