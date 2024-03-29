import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccComponent } from './manage-acc.component';

describe('ManageAccComponent', () => {
  let component: ManageAccComponent;
  let fixture: ComponentFixture<ManageAccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAccComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
