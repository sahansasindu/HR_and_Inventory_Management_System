import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllowancesComponent } from './add-allowances.component';

describe('AddAllowancesComponent', () => {
  let component: AddAllowancesComponent;
  let fixture: ComponentFixture<AddAllowancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAllowancesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
