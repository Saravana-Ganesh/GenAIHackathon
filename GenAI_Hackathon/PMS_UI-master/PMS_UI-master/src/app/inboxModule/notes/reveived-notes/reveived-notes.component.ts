import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from '../../inbox.service';
import { ChangePasswordComponent } from 'src/app/sharedModule/change-password/change-password.component';
import { DataSource } from '@angular/cdk/collections';
import { ReplyNotesComponent } from '../reply-notes/reply-notes.component';

@Component({
  selector: 'app-reveived-notes',
  templateUrl: './reveived-notes.component.html',
  styleUrls: ['./reveived-notes.component.css']
})
export class ReceivedNotesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort


  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];
  tempArray: any[] = [];

  constructor(
    private restService: InboxService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
   this.fetchMessages();
    
}

messageReply(row:any){
  console.log("Reply button pressed with some data -> ", row);
  this.dialog.open(ReplyNotesComponent,{
    data:row
  }).afterClosed().subscribe(
    val=>{
    this.fetchMessages();
    }
  );
}
fetchMessages(){
  this.restService.fetchReceivedNotes().subscribe((response) => {
    console.log("received .."+response);
    this.dataSource = new MatTableDataSource(response);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
    //Fetch keys from the Json Array
    response.forEach((key) => {
      Object.keys(key).forEach((key2) => {
        this.tempArray.push(key2);
      })
    })
    //Remove Duplicates 
    this.tempArray = [...new Set(this.tempArray)];
    this.displayedColumns = ['receivername','designation','is_urgent', 'created_on', 'content', 'reply','delete'];
    console.log(this.displayedColumns)
  }
  );
}
deleteMessage(id:number){
  console.log("deleteMessage");
  this.restService.deleteMessageById(id).subscribe(
  data=> {
    this.fetchMessages();
  }
  )
  this.dataSource._updateChangeSubscription(); 
 // this.fetchMessages();
  // this.dialog.open(ChangePasswordComponent);
}

}
