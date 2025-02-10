import { Component, OnInit,inject, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CalenderEventComponent } from '../calender-event/calender-event.component';
import { EmployeeAppointmentComponent } from '../employee-appointment/employee-appointment.component';
import { ApiService } from '../shared/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-calendar',
  templateUrl: './employee-calendar.component.html',
  styleUrls: ['./employee-calendar.component.css']
})
export class EmployeeCalendarComponent implements OnInit {

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames= ['JAN','FEB','MAR','APRL','MAY','JUN','JULY','AUG','SEP','OCT','NOV','DES'];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  
  matDialogRef: MatDialogRef<EmployeeAppointmentComponent>|undefined;
  name: string = "";
  userForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,private matDialog: MatDialog,public dialog: MatDialog,private service: ApiService) {
    // this.matDialogRef = {};
   }

  ngOnInit(): void {
    this.date = new Date();
    this.getDaysOfMonth();
    this.userForm = this.formBuilder.group({
      role: ["Nurse",Validators.required]
    });
  }

  openDialog(appointment: any): void {
    let selectedDate = new Date(this.date.getMonth()+1+'/'+appointment.day+'/'+this.date.getFullYear()).setHours(0,0,0,0);;
    let todaysDate = new Date().setHours(0,0,0,0);
    console.log(new Date(selectedDate).getTime(),new Date(todaysDate).getTime());
    
    if(new Date(selectedDate).getTime() < new Date(todaysDate).getTime()){
     return
    }
    const dialogRef = this.dialog.open(CalenderEventComponent,{
      data:{ role:this.userForm.value.role,date: this.date.getMonth()+1+'/'+appointment.day+'/'+this.date.getFullYear(), appointment: appointment},
      width: '75%',
      height: '75%',
      backdropClass: 'dialog-bg-trans'
    });

    this.dialog.afterAllClosed.subscribe(
      () => (this.getDaysOfMonth()
      )
    );
}


  OpenModal() {
    this.matDialogRef = this.matDialog.open(EmployeeAppointmentComponent, {
      data: { name: this.name },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe((res: any) => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if(this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }
  
    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for(var i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }
    
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
    let flag = false;
    for (let j = 0; j < this.service.appointmentData.length; j++) {
      console.log(new Date(this.service.appointmentData[j].date).getDate());
        if(i+1 === new Date(this.service.appointmentData[j].date).getDate()){
          this.daysInThisMonth.push({day:i+1,title:this.service.appointmentData[j].title,time:this.service.appointmentData[j].time,type:this.service.appointmentData[j].type,description:this.service.appointmentData[j].description,index:j,ptInfo:this.service.appointmentData[j].ptInfo,patient:this.service.appointmentData[j].patient});
          flag = true;
        }
      }
      if(!flag){
        this.daysInThisMonth.push({day:i+1,title:'',time:''});
      }
    }
    // for (var i = 0; i < thisNumOfDays; i++) {
    //   this.daysInThisMonth.push(i+1);
    // }
  
    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var i = 0; i < (6-lastDayThisMonth); i++) {
      this.daysInNextMonth.push(i+1);
    }
    var totalDays = this.daysInLastMonth.length+this.daysInThisMonth.length+this.daysInNextMonth.length;
    if(totalDays<36) {
      for(var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth)+7); i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0);
    this.getDaysOfMonth();
  }
}
