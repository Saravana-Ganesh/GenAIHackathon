import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentVisitInfoComponent } from './current-visit-info.component';

describe('CurrentVisitInfoComponent', () => {
  let component: CurrentVisitInfoComponent;
  let fixture: ComponentFixture<CurrentVisitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentVisitInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentVisitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
