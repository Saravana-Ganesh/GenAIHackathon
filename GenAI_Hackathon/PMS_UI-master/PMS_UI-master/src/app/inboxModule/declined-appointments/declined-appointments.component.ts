import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from '../inbox.service';
import { DeclinedAppointments } from '../modal/decline-appointments';
@Component({
  selector: 'app-declined-appointments',
  templateUrl: './declined-appointments.component.html',
  styleUrls: ['./declined-appointments.component.css']
})
export class DeclinedAppointmentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort

  dataSource: any;
  displayedColumns!: string[];
  tempArray: any[] = [];
  declinedAppointments: DeclinedAppointments[] = [];
  
  constructor(
    private restService: InboxService
  ) { }

  ngOnInit(): void {
    this.restService.getDeclinedAppointments().subscribe((response) => {
      var data = '';
      console.log("upcoming response data -> ", response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      //Fetch keys from the Json Array
      response.forEach((key) => {
        Object.keys(key).forEach((key2) => {
          this.tempArray.push(key2);
        })
      })
      this.declinedAppointments = response;
      //Remove Duplicates 
      this.tempArray = [...new Set(this.tempArray)];
      console.log("This is data Source -> ", this.dataSource);
      var tempTempArray = ['title', 'description', 'physician_name', 'date', 'from_time', 'to_time']
      //this.displayedColumns = this.tempArray;
      this.displayedColumns = tempTempArray;
      console.log ("Printing columns here -> ",this.displayedColumns)
    }
    );
  }

}
