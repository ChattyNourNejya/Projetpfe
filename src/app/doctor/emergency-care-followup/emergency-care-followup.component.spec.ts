import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyCareFollowupComponent } from './emergency-care-followup.component';

describe('EmergencyCareFollowupComponent', () => {
  let component: EmergencyCareFollowupComponent;
  let fixture: ComponentFixture<EmergencyCareFollowupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyCareFollowupComponent]
    });
    fixture = TestBed.createComponent(EmergencyCareFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
