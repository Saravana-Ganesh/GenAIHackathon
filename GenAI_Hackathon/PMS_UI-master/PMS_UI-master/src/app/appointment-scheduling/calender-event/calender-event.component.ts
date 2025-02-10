import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-calender-event',
  templateUrl: './calender-event.component.html',
  styleUrls: ['./calender-event.component.css']
})
export class CalenderEventComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public dialog: MatDialog,private formBuilder: FormBuilder,private service: ApiService) { }
  userForm!: FormGroup;
  date={value:new Date()};
  appointmentData: any = [];
  isEdit = false;
  ngOnInit(): void {
    if(this.data.appointment.title){
      // this.isEdit = true;
      console.log(this.data.appointment);
      this.userForm = this.formBuilder.group({
        description: ['',Validators.required],
        type: ['',Validators.required],
        date: ['',Validators.required],
        title:['',Validators.required],
         time:['',Validators.required],
         patient:['',Validators.required],
         ptInfo:['',Validators.required],
         ptDetails:['click to redirect to pt details screen',''],
         editHistory:['Last edited at 12:00 pm today',''],
         physicianId:['',''],
         empId:['12345',''],
         slots:['',''],
         dataStatus:['Data will be ready for collection on 18/12/2022','']
      });
    }
    else{
      this.userForm = this.formBuilder.group({
        description: ['',Validators.required],
        type: ['',Validators.required],
        date: [new Date(this.data.date),Validators.required],
        title:['',Validators.required],
         time:['',Validators.required],
         patient:[,Validators.required],
         ptInfo:[,Validators.required],
         ptDetails:['click to redirect to pt details screen',''],
         editHistory:['Last edited at 12:00 pm today',''],
         physicianId:['',''],
         empId:['12345',''],
         slots:['',''],
         dataStatus:['Data will be ready for collection on 18/12/2022',''],
      });
    }
    this.dialog.afterAllClosed.subscribe(
      () => (
        this.editOrAddAppointment = ""
        
        //this.getDaysOfMonth()
      )
    );
  }
  addAppointment(){
    console.log(this.userForm.value);
    if(this.isEdit){
      this.service.appointmentData[this.data.appointment.index]=this.userForm.value;
    }else{
      this.add(this.userForm.value)
      // this.service.appointmentData.push(this.userForm.value);
      console.log(this.service.appointmentData);
      this.userForm = this.formBuilder.group({
        description: ['',Validators.required],
        type: ['',Validators.required],
        date: [new Date(this.data.date),Validators.required],
        title:['',Validators.required],
         time:['',Validators.required],
         patient:[,Validators.required],
         ptInfo:[,Validators.required],
         ptDetails:['click to redirect to pt details screen',''],
         editHistory:['Last edited at 12:00 pm today',''],
         physicianId:['',''],
         empId:['12345',''],
         slots:['',''],
         dataStatus:['Data will be ready for collection on 18/12/2022','']
      });
    }
  }
  editOrAddAppointment : string ="";
  addAppointmentClick(){
    this.editOrAddAppointment = "add";
  }

  editAppointment(){
    this.editOrAddAppointment = "";
    this.editOrAddAppointment = "edit";
    this.isEdit = true;
      console.log(this.data.appointment);
      this.userForm = this.formBuilder.group({
        description: [this.data.appointment.description,Validators.required],
        type: [this.data.appointment.type,Validators.required],
        date: [new Date(this.data.date),Validators.required],
        title:[this.data.appointment.title,Validators.required],
         time:[this.data.appointment.time,Validators.required],
         patient:[this.data.appointment.patient,Validators.required],
         ptInfo:[this.data.appointment.ptInfo,Validators.required],
         ptDetails:['click to redirect to pt details screen',''],
         editHistory:['Last edited at 12:00 pm today',''],
         physicianId:['',''],
         empId:['12345',''],
         slots:['',''],
         dataStatus:['Data will be ready for collection on 18/12/2022','']
      });
  }
  add(form:any) {
    console.log(form.date);
    
    const { length } = this.service.appointmentData;
    const id = length + 1;
    const found = this.service.appointmentData.some((el: any) => el.date === form.date);
    if(!found){
       this.service.appointmentData.push(form)
    }else{
      alert("appointment can not be added")
    }
    return this.service.appointmentData;
  }
  deleteAppointment(){
    this.service.appointmentData.splice(this.data.appointment.index,1);
  }
  public errorHandling = (control: string, error: string) => {
    return this.userForm.controls[control].hasError(error);
  }
  }
  // onSend(userForm: NgForm){
  //   let data = userForm.value;
  //   console.log(data);
  // }

