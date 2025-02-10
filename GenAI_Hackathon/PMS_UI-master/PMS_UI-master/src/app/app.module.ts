import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EntryModule } from './entryModule/entry.module';
import { PatientDetailModule } from './patientDetailModule/patient-detail.module';
import { InboxModule } from './inboxModule/inbox-module';
import { PatientVisitModule } from './patientVisitModule/patient-visit.module';
import { AdminModule } from './adminModule/admin.module';
import { AppointmentSchedulingModule } from './appointment-scheduling/appointment-scheduling.module';
import { SchedulingModule } from './schedulingModule/scheduling.module';

import { NgChartsModule } from 'ng2-charts';

import { RecurrenceEditorAllModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';



import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';



import { TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DeclinedAppointmentsComponent } from './inboxModule/declined-appointments/declined-appointments.component';


@NgModule({
  declarations: [
    AppComponent,
    DeclinedAppointmentsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    EntryModule,
    PatientDetailModule,
    InboxModule,
    PatientVisitModule,
    AdminModule,
    AppointmentSchedulingModule,
    SchedulingModule,
    NgChartsModule,
    ScheduleAllModule,
    RecurrenceEditorAllModule,
    DatePickerAllModule,
    NumericTextBoxAllModule,
    MultiSelectAllModule,
    MaskedTextBoxModule, UploaderAllModule,
    TimePickerAllModule, DateTimePickerAllModule,
    TextBoxAllModule
    



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
