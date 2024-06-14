import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultDiscussionComponent } from './test-result-discussion.component';

describe('TestResultDiscussionComponent', () => {
  let component: TestResultDiscussionComponent;
  let fixture: ComponentFixture<TestResultDiscussionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestResultDiscussionComponent]
    });
    fixture = TestBed.createComponent(TestResultDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
