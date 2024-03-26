import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBuyModalComponentComponent } from './company-buy-modal-component.component';

describe('CompanyBuyModalComponentComponent', () => {
  let component: CompanyBuyModalComponentComponent;
  let fixture: ComponentFixture<CompanyBuyModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyBuyModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBuyModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
