import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationDataComponent } from './medication-data.component';

describe('MedicationDataComponent', () => {
  let component: MedicationDataComponent;
  let fixture: ComponentFixture<MedicationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
