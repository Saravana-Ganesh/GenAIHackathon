import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-appointment',
  templateUrl: './employee-appointment.component.html',
  styleUrls: ['./employee-appointment.component.css']
})
export class EmployeeAppointmentComponent implements OnInit {
  [x: string]: any;
  name: string='sandip';
  constructor(private _mdr: MatDialogRef<EmployeeAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) { 
      let str=data.name;
      console.log(str);
  }
  CloseDialog() {
    this._mdr.close(false)
  }
  ngOnInit(): void {
  }
OpenModal() {
    this['matDialogRef'] = this['matDialog'].open(EmployeeAppointmentComponent, {
      data: { name: this.name },
      disableClose: true
    });
}
}
