import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalTestAnalysisComponent } from './medical-test-analysis.component';

describe('MedicalTestAnalysisComponent', () => {
  let component: MedicalTestAnalysisComponent;
  let fixture: ComponentFixture<MedicalTestAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalTestAnalysisComponent]
    });
    fixture = TestBed.createComponent(MedicalTestAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
