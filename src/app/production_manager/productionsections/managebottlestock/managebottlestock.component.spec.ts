import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebottlestockComponent } from './managebottlestock.component';

describe('ManagebottlestockComponent', () => {
  let component: ManagebottlestockComponent;
  let fixture: ComponentFixture<ManagebottlestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagebottlestockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagebottlestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
