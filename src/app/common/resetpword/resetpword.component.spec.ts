import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwordComponent } from './resetpword.component';

describe('ResetpwordComponent', () => {
  let component: ResetpwordComponent;
  let fixture: ComponentFixture<ResetpwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetpwordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetpwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
