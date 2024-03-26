import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanychartsComponent } from './companycharts.component';

describe('CompanychartsComponent', () => {
  let component: CompanychartsComponent;
  let fixture: ComponentFixture<CompanychartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanychartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanychartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
