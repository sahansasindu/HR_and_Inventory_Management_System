import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenubarstoreComponent } from './sidemenubarstore.component';

describe('SidemenubarstoreComponent', () => {
  let component: SidemenubarstoreComponent;
  let fixture: ComponentFixture<SidemenubarstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidemenubarstoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidemenubarstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
