import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from '../../inbox.service';

@Component({
  selector: 'app-sent-notes',
  templateUrl: './sent-notes.component.html',
  styleUrls: ['./sent-notes.component.css']
})
export class SentNotesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort


  dataSource: any;
  displayedColumns!: string[];
  tempArray: any[] = [];

  constructor(
    private restService: InboxService
  ) { }

  ngOnInit(): void {
    this.restService.fetchSentNotes().subscribe((response) => {
      console.log("sent notes .."+response);
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

     this.tempArray.forEach((element,index)=>{
      if(element==='sendername')  this.tempArray.splice(index,1);
     })

     console.log("aarhffe "+this.tempArray)

      this.displayedColumns = this.tempArray;
      console.log(this.displayedColumns)
    }
    );

}
}
