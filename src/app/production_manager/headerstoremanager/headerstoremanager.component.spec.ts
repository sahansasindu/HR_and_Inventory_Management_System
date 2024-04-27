import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderstoremanagerComponent } from './headerstoremanager.component';

describe('HeaderstoremanagerComponent', () => {
  let component: HeaderstoremanagerComponent;
  let fixture: ComponentFixture<HeaderstoremanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderstoremanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderstoremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
