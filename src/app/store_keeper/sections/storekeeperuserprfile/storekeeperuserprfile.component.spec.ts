import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorekeeperuserprfileComponent } from './storekeeperuserprfile.component';

describe('StorekeeperuserprfileComponent', () => {
  let component: StorekeeperuserprfileComponent;
  let fixture: ComponentFixture<StorekeeperuserprfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorekeeperuserprfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorekeeperuserprfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
