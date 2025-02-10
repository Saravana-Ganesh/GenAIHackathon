import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppointmetDetaialsComponent } from './edit-appointmet-detaials.component';

describe('EditAppointmetDetaialsComponent', () => {
  let component: EditAppointmetDetaialsComponent;
  let fixture: ComponentFixture<EditAppointmetDetaialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppointmetDetaialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmetDetaialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
