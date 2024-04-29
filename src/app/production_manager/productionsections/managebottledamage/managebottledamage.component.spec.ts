import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebottledamageComponent } from './managebottledamage.component';

describe('ManagebottledamageComponent', () => {
  let component: ManagebottledamageComponent;
  let fixture: ComponentFixture<ManagebottledamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagebottledamageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagebottledamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
