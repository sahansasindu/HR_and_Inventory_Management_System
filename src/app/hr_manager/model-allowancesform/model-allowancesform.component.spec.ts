import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAllowancesformComponent } from './model-allowancesform.component';

describe('ModelAllowancesComponent', () => {
  let component: ModelAllowancesformComponent;
  let fixture: ComponentFixture<ModelAllowancesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelAllowancesformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelAllowancesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
