import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUserManagementComponent } from './hospital-user-management.component';

describe('HospitalUserManagementComponent', () => {
  let component: HospitalUserManagementComponent;
  let fixture: ComponentFixture<HospitalUserManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalUserManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
