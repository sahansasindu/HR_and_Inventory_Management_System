import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenubarstoremanagerComponent } from './sidemenubarstoremanager.component';

describe('SidemenubarstoremanagerComponent', () => {
  let component: SidemenubarstoremanagerComponent;
  let fixture: ComponentFixture<SidemenubarstoremanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidemenubarstoremanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidemenubarstoremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
