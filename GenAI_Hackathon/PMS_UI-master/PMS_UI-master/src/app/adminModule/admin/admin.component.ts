import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/sharedModule/change-password/change-password.component';
import { AdminService } from '../service/admin.service';
// import { ReplyNotesComponent } from 'src/app/inboxModule/notes/reply-notes/reply-notes.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
 // title: string="Admin Dashboard";

 constructor(private router:Router,public adminService:AdminService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // onTitleChange(value: string) {
  //   this.title = value;
  // }

  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/welcome');
  }

  changePassword(){
    this.dialog.open(ChangePasswordComponent);
    // Temporarily changing it to the replyNotesComponent
    // commen the below when you are done with replyNotes implementation
    // this.dialog.open(ReplyNotesComponent);
  }

  
}
