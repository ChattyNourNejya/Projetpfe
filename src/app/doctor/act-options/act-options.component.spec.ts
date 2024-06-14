import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActOptionsComponent } from './act-options.component';

describe('ActOptionsComponent', () => {
  let component: ActOptionsComponent;
  let fixture: ComponentFixture<ActOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActOptionsComponent]
    });
    fixture = TestBed.createComponent(ActOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
