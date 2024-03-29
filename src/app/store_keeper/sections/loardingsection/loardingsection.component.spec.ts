import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoardingsectionComponent } from './loardingsection.component';

describe('LoardingsectionComponent', () => {
  let component: LoardingsectionComponent;
  let fixture: ComponentFixture<LoardingsectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoardingsectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoardingsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
