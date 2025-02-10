import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from '../inbox.service';
import { Appointments } from '../modal/upcoming-appointments';

@Component({
  selector: 'app-upcoming-appointments',
  templateUrl: './upcoming-appointments.component.html',
  styleUrls: ['./upcoming-appointments.component.css']
})
export class UpcomingAppointmentsComponent implements OnInit {

  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort


  dataSource: any;
  displayedColumns!: string[];
  tempArray: any[] = [];

  upcomingAppointments: Appointments[] = [];
  constructor(
    private restService: InboxService
  ) { }

  ngOnInit(): void {
    this.restService.getUpcomingAppointments().subscribe((response) => {
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
      this.upcomingAppointments = response;
      //Remove Duplicates 
      this.tempArray = [...new Set(this.tempArray)];
      console.log("This is data Source -> ", this.dataSource);
      var tempTempArray = ['title', 'description', 'physician_name','patient_name', 'date', 'from_time', 'to_time', 'history']
      //this.displayedColumns = this.tempArray;
      this.displayedColumns = tempTempArray;
      console.log ("Printing columns here -> ",this.displayedColumns)
    }
    );
  }
  currentDate = new Date();
}
