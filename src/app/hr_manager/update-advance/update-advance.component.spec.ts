import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdvanceComponent } from './update-advance.component';

describe('UpdateAdvanceComponent', () => {
  let component: UpdateAdvanceComponent;
  let fixture: ComponentFixture<UpdateAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAdvanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
