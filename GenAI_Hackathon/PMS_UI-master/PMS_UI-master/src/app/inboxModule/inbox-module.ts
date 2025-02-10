import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingAppointmentsComponent } from './upcoming-appointments/upcoming-appointments.component';
import { NotesModule } from './notes/notes.module';
import { MaterialModule } from '../sharedModule/materialModule/material/material.module';

@NgModule({
  declarations: [
    UpcomingAppointmentsComponent
  ],
  imports: [
    CommonModule,
    NotesModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
})
export class InboxModule { }
