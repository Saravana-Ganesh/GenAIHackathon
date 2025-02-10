import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisDataComponent } from './diagnosis-data.component';

describe('DiagnosisDataComponent', () => {
  let component: DiagnosisDataComponent;
  let fixture: ComponentFixture<DiagnosisDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosisDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosisDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
