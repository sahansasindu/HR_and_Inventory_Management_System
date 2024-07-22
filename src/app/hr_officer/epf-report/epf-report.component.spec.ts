import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPFReportComponent } from './epf-report.component';

describe('EPFReportComponent', () => {
  let component: EPFReportComponent;
  let fixture: ComponentFixture<EPFReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EPFReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EPFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
