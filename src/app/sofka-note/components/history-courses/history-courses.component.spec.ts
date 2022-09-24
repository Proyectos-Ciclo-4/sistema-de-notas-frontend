import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCoursesComponent } from './history-courses.component';

describe('HistoryCoursesComponent', () => {
  let component: HistoryCoursesComponent;
  let fixture: ComponentFixture<HistoryCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
