import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptysectionComponent } from './emptysection.component';

describe('EmptysectionComponent', () => {
  let component: EmptysectionComponent;
  let fixture: ComponentFixture<EmptysectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptysectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptysectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
