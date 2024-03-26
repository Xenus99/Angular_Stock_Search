import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySellModalComponent } from './company-sell-modal.component';

describe('CompanySellModalComponent', () => {
  let component: CompanySellModalComponent;
  let fixture: ComponentFixture<CompanySellModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanySellModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanySellModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
