import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from '../../inbox.service';
import { EntryService } from 'src/app/entryModule/services/entry.service';

@Component({
  selector: 'app-reply-notes',
  templateUrl: './reply-notes.component.html',
  styleUrls: ['./reply-notes.component.css']
})
export class ReplyNotesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort

  dataSource: any;
  displayedColumns!: string[];
  tempArray: any[] = [];

  public replyNotesForm!:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private restService: InboxService,
    private entryService: EntryService,
    private dialogRef: MatDialogRef<ReplyNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public replyData: any,
  ) { }

  ngOnInit(): void {
    this.replyNotesForm= this.formBuilder.group({
      sendername:['',Validators.required],
      messagecontent:['',Validators.required],
      meesagereply:['',Validators.required]
    });

    console.log('Inside dialog data is -> ' , this.replyData);

    this.replyNotesForm.controls['sendername'].setValue(this.replyData.receivername);
    this.replyNotesForm.controls['messagecontent'].setValue(this.replyData.content);
    
  }

  replyNotes(){
    var old_data = this.replyData;
    old_data['content'] = this.replyNotesForm.value.meesagereply;
    old_data['username'] = window.sessionStorage.getItem('username');
    console.log("This is old_data ", old_data );

    return
  }
}
