import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSurgicalCheckupComponent } from './post-surgical-checkup.component';

describe('PostSurgicalCheckupComponent', () => {
  let component: PostSurgicalCheckupComponent;
  let fixture: ComponentFixture<PostSurgicalCheckupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostSurgicalCheckupComponent]
    });
    fixture = TestBed.createComponent(PostSurgicalCheckupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
