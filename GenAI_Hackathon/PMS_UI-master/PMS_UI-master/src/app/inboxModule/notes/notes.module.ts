import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendNotesComponent } from './send-notes/send-notes.component';
import { SentNotesComponent } from './sent-notes/sent-notes.component';
import { MaterialModule } from 'src/app/sharedModule/materialModule/material/material.module';
import { ReceivedNotesComponent } from './reveived-notes/reveived-notes.component';
import { ReplyNotesComponent } from './reply-notes/reply-notes.component';



@NgModule({
  declarations: [
    SendNotesComponent,
    SentNotesComponent,
    ReceivedNotesComponent,
    ReplyNotesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule
  ]
  
})
export class NotesModule { }
