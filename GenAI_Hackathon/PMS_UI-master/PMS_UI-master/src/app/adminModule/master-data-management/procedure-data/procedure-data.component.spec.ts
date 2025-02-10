import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDataComponent } from './procedure-data.component';

describe('ProcedureDataComponent', () => {
  let component: ProcedureDataComponent;
  let fixture: ComponentFixture<ProcedureDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
