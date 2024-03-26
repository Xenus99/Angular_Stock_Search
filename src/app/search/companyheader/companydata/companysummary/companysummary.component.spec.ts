import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysummaryComponent } from './companysummary.component';

describe('CompanysummaryComponent', () => {
  let component: CompanysummaryComponent;
  let fixture: ComponentFixture<CompanysummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanysummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanysummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
