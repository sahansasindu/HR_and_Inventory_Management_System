import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductioncricleComponent } from './productioncricle.component';

describe('ProductioncricleComponent', () => {
  let component: ProductioncricleComponent;
  let fixture: ComponentFixture<ProductioncricleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductioncricleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductioncricleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
