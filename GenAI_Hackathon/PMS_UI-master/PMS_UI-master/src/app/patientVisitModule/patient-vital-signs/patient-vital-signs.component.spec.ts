import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVitalSignsComponent } from './patient-vital-signs.component';

describe('PatientVitalSignsComponent', () => {
  let component: PatientVitalSignsComponent;
  let fixture: ComponentFixture<PatientVitalSignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientVitalSignsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVitalSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
