import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, ResizeService, DragAndDropService, RecurrenceEditorModule, ScheduleModule, ScheduleAllModule } from '@syncfusion/ej2-angular-schedule';
import { PhysicianSchedulingComponent } from './physician-scheduling/physician-scheduling.component';
import { EntryRoutes } from './scheduling.routing';
import { CalendarModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MaterialModule } from '../sharedModule/materialModule/material/material.module';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { EditAppointmetDetaialsComponent } from './edit-appointmet-detaials/edit-appointmet-detaials.component';



@NgModule({
  declarations: [
    PhysicianSchedulingComponent,
    EditAppointmetDetaialsComponent
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService, ResizeService, DragAndDropService,DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EntryRoutes),
    ScheduleModule,
    RecurrenceEditorModule,
    DialogModule,
    DropDownListModule,
    DateTimePickerModule,
    MaterialModule,
    CalendarModule,
    DatePickerModule,
    TimePickerModule,
    DateRangePickerModule

  ],
  exports:[
    MaterialModule,
    CalendarModule,
    DateTimePickerModule,
    CalendarModule
  ]

})
export class SchedulingModule { }
