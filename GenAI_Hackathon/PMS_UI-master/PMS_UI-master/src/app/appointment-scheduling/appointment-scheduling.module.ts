import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeCalendarComponent } from './employee-calendar/employee-calendar.component';
import { CalenderEventComponent } from './calender-event/calender-event.component';
import { EmployeeAppointmentComponent } from './employee-appointment/employee-appointment.component';
import { SharedModule } from '../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { EntryRoutes } from './appointment-scheduling-routing';

@NgModule({
  declarations: [
    EmployeeCalendarComponent,
    CalenderEventComponent,
    EmployeeAppointmentComponent,
    CalenderEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EntryRoutes)
  ],
})
export class AppointmentSchedulingModule { }
