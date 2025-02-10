import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedAppointmentsComponent } from './declined-appointments.component';

describe('DeclinedAppointmentsComponent', () => {
  let component: DeclinedAppointmentsComponent;
  let fixture: ComponentFixture<DeclinedAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
