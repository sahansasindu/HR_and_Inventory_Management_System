import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesectionComponent } from './updatesection.component';

describe('UpdatesectionComponent', () => {
  let component: UpdatesectionComponent;
  let fixture: ComponentFixture<UpdatesectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatesectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatesectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
