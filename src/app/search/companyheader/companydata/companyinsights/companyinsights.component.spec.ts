import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinsightsComponent } from './companyinsights.component';

describe('CompanyinsightsComponent', () => {
  let component: CompanyinsightsComponent;
  let fixture: ComponentFixture<CompanyinsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyinsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyinsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
