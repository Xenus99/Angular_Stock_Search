import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyheaderComponent } from './companyheader.component';

describe('CompanyheaderComponent', () => {
  let component: CompanyheaderComponent;
  let fixture: ComponentFixture<CompanyheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyheaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
