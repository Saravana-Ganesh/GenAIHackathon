import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InboxService } from 'src/app/inboxModule/inbox.service';
import { Appointments } from 'src/app/inboxModule/modal/upcoming-appointments';
import { DialogBoxComponent } from 'src/app/patientVisitModule/dialog-box/dialog-box.component';
import { EditAppointmentDetails } from '../modal/EditAppointment';
import { SchedulingService } from '../scheduling.service';

@Component({
  selector: 'app-edit-appointmet-detaials',
  templateUrl: './edit-appointmet-detaials.component.html',
  styleUrls: ['./edit-appointmet-detaials.component.css']
})
export class EditAppointmetDetaialsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort


  data: any = "";
  dataSource: any;
  displayedColumns: string[] = ['createdBy', 'editReason', 'previousFromTime', 'previousToTime', 'meetingId'];
  tempArray: any[] = [];
  editAppointment: EditAppointmentDetails= new EditAppointmentDetails();

  upcomingAppointments: EditAppointmentDetails[] = [];
  constructor(
    private restService: SchedulingService,
    @Inject(MAT_DIALOG_DATA) public inputdata: EditAppointmentDetails[],
    public dialogRef: MatDialogRef<EditAppointmentDetails>,
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.inputdata);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

}
