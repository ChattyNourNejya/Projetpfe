import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstaysstaffComponent } from './allstaysstaff.component';

describe('AllstaysstaffComponent', () => {
  let component: AllstaysstaffComponent;
  let fixture: ComponentFixture<AllstaysstaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllstaysstaffComponent]
    });
    fixture = TestBed.createComponent(AllstaysstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
