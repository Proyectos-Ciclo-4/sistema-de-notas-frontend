import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySuscriptionsComponent } from './my-suscriptions.component';

describe('MySuscriptionsComponent', () => {
  let component: MySuscriptionsComponent;
  let fixture: ComponentFixture<MySuscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySuscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySuscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
