import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstaysComponent } from './allstays.component';

describe('AllstaysComponent', () => {
  let component: AllstaysComponent;
  let fixture: ComponentFixture<AllstaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllstaysComponent]
    });
    fixture = TestBed.createComponent(AllstaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
