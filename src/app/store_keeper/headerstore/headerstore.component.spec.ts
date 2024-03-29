import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderstoreComponent } from './headerstore.component';

describe('HeaderstoreComponent', () => {
  let component: HeaderstoreComponent;
  let fixture: ComponentFixture<HeaderstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderstoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
