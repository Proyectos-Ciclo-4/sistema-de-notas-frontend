import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudentComponent } from './home-student.component';

describe('HomeStudentComponent', () => {
  let component: HomeStudentComponent;
  let fixture: ComponentFixture<HomeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
