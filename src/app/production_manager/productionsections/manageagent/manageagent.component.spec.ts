import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageagentComponent } from './manageagent.component';

describe('ManageagentComponent', () => {
  let component: ManageagentComponent;
  let fixture: ComponentFixture<ManageagentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageagentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
