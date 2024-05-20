import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappenedAppointmentComponent } from './happened-appointment.component';

describe('HappenedAppointmentComponent', () => {
  let component: HappenedAppointmentComponent;
  let fixture: ComponentFixture<HappenedAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HappenedAppointmentComponent]
    });
    fixture = TestBed.createComponent(HappenedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
