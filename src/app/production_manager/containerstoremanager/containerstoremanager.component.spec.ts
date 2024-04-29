import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerstoremanagerComponent } from './containerstoremanager.component';

describe('ContainerstoremanagerComponent', () => {
  let component: ContainerstoremanagerComponent;
  let fixture: ComponentFixture<ContainerstoremanagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerstoremanagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerstoremanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
