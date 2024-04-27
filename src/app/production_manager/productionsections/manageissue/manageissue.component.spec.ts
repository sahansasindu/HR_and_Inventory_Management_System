import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageissueComponent } from './manageissue.component';

describe('ManageissueComponent', () => {
  let component: ManageissueComponent;
  let fixture: ComponentFixture<ManageissueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageissueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageissueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
