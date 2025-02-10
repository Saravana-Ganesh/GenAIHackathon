import { Component, OnInit, ViewChild } from '@angular/core';
import { EJ2Instance, PopupOpenEventArgs, RecurrenceEditor, TimeScaleModel, View } from '@syncfusion/ej2-angular-schedule';
import { ActionEventArgs, EventRenderedArgs, EventSettingsModel, ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
import { ChangeEventArgs, DropDownList } from '@syncfusion/ej2-angular-dropdowns';
import { Ajax, extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import { SchedulingService } from '../scheduling.service';
import { Appointments } from 'src/app/inboxModule/modal/upcoming-appointments';
import { Receiver } from 'src/app/inboxModule/modal/Receiver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { F } from '@angular/cdk/keycodes';
import { DateTimePicker } from '@syncfusion/ej2-angular-calendars';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DatePipe } from '@angular/common';
import { ToasterService } from 'src/app/sharedModule/services/toaster.service';
import { SessionStorageService } from 'src/app/sharedModule/services/session-storage.service';
import { MapType } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { EditAppointmentDetails } from '../modal/EditAppointment';
import { EditAppointmetDetaialsComponent } from '../edit-appointmet-detaials/edit-appointmet-detaials.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-physician-scheduling',
  templateUrl: './physician-scheduling.component.html',
  styleUrls: ['./physician-scheduling.component.css']
})
export class PhysicianSchedulingComponent implements OnInit {

  listOfPhysicians: any[];
  listOfPhysiciansAppointments: any[] = [];
  receiver: Receiver = new Receiver();
  dateArray: any[] = [];
  timeArray: any[] = [];
  temp2: any[] = [
    { id: "" }
  ];
  temp3: any = {}
  isPhysicanSelected = true;
  filterForm!: FormGroup;
  physcian: string = "";
  patientDetails: any;
  currentDate = new Date();
  appoint: any = {
    "physician": "", "patient": "", "fromTime": new Date(), "toTime": new Date(), "date": new Date(), "title": "", "description": ""
    , "status": ""
  }
  public statusData: string[] = ['Pending', 'Approved','Declined'];
  public timeScale: TimeScaleModel = { enable: true, interval: 60, slotCount: 1 };
  public fields: Object = { text: 'first_name', value: 'emp_id' };
  public fields2: Object = { text: 'firstName', value: 'employeeId' };
  public query: Query = new Query().from('Physician').select(['first_name', 'emp_id']).take(6);
  public query2: Query = new Query().from('Physician').select(['firstName', 'employeeId']).take(6);
  public showReason: boolean = false;
  public loggedInUser = window.sessionStorage.getItem("role");
  username = JSON.parse(this.sessionStorage.getUserData()).username;
  tempUser: string = ""
  //  username:string= "";
  @ViewChild('scheduleObj')
  public scheduleObj!: ScheduleComponent;

  // public maxDate: Date = new Date('8/3/2022 09:00 AM');
  // public dateValue: Date = new Date('8/3/2022 08:00 PM');

  //public eventSettings: EventSettingsModel = { dataSource: extend([], doctorsEventData, undefined, true) as Record<string, any>[] };
  public selectedDate: Date = new Date();
  public showQuickInfo = false;
  public startDate!: Date;
  public endDate!: Date;
  private appointment: Appointments = new Appointments;

  public physicians: DataManager = new DataManager({
    url: `/scheduling-service/scheduler/getPhysicians`,
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  public physicianLoginDropDown: DataManager = new DataManager({
    url: `/scheduling-service/scheduler/get/hospitalUser/${this.username}`,
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  // public data: object[] = [{
  //   title: 'Paris',
  //   fromTime: new Date(2022, 2, 15, 10, 0),
  //   toTime: new Date(2022, 2, 15, 12, 30),
  //   description: "dddd"
  // }];



  public eventSettings: EventSettingsModel = {
    dataSource: this.temp2,
    fields: {
      id: "id",
      subject: { name: 'title', validation: { required: true } },
      description: {
        name: 'patient', validation: {
          required: true
        }
      },
      location: {
        name: 'description', validation: {
          required: true, minLength: 5, maxLength: 600
        }
      },
      startTime: { name: 'fromTime', validation: { required: true } },
      endTime: { name: 'toTime', validation: { required: true } },
      recurrenceRule: { name: 'RecurrenceEditor', validation: { required: false } }
    }
  };

  temp: any;

  constructor(private restService: SchedulingService, private formBuilder: FormBuilder, private datepipe: DatePipe, private toaster: ToasterService,
    private sessionStorage: SessionStorageService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.filterForm = this.formBuilder.group({
      physician: [''],
      physicianId: ['']
    })

    if (this.loggedInUser == 'ROLE_PHYSICIAN') {
      this.isPhysicanSelected = false;
    }
    console.log("usernme" + this.username);
    this.restService.fetchHospitalUserData(this.username).subscribe((response) => {
      this.sessionStorage.saveLoggedInUserData(response);
      this.listOfPhysicians = response;
      console.log("ussername :: " + this.sessionStorage.getLoggedInUserData())
      //console.log("usernndnd:: "+)
      if (this.loggedInUser == 'ROLE_PHYSICIAN') {
        this.tempUser = response[0].employeeId;
      }
      this.tempUser = response[0].employeeId;
      this.listOfPhysicians.forEach(element => {
        // this.receiver.emp_id = element.employeeId;
        // this.receiver.first_name = element.firstName;
        // this.receiver.lastName =  element.lastName;
        // this.receiver.designation = element.designation;
        // this.receiver.accountStatus = element.accountStatus;
        // this.receiver.deleteFlag = element.deleteFlag;
        // this.receiver.role = element.role;
        // this.receiver.title = element.title;
        // this.receiver.username = element.userName;
        // this.listOfPhysicians = [];
        // this.listOfPhysicians.push(this.receiver);
        // this.appoint.physician =  element.firstName;
        // this.temp.empId  = "";
        // this.temp.empId = element.employeeId;
        // this.temp.firstName = element.firstName;
        // this.temp.lastName = element.lastName;

        this.temp = element;
      });

      if (this.loggedInUser != 'ROLE_PHYSICIAN') {
        this.appoint.status = 'Pending'
      }

      this.getAllPhysiciansAppointments(this.temp);
    })

    if (this.loggedInUser != 'ROLE_PHYSICIAN') {
      this.restService.physiciansDropdownList().subscribe((response) => {
        this.listOfPhysicians = response;
        console.log("drop down " + response);
      })
    }
  }

  public getStatus(): string {
    if (this.loggedInUser != 'ROLE_PHYSICIAN') {
      return 'Pending';
    }
    else return '';
  }

  getPhysicianId(data: any) {
    this.filterForm.controls['physicianId'].setValue(data.value);
    this.isPhysicanSelected = false;
    this.appoint.physician = this.filterForm.value.physician;
    let temp = "";
    // this.temp2 =[];
    this.listOfPhysicians.filter(f => f.emp_id == data.value).forEach(element => {
      temp = element
    });
    console.log("temps" + temp);
    this.getAllPhysiciansAppointments(temp);
  }

  getAllPhysiciansAppointments(temp: any) {
    // this.temp2 = [];
    this.temp2.splice(1);

    this.restService.getPhysiciansAppoinments(temp).subscribe((response) => {
      this.listOfPhysiciansAppointments = response;
      this.listOfPhysiciansAppointments.forEach(element => {
        this.dateArray = element.date.split("-");
        console.log(this.dateArray)
        this.dateArray[1] = this.dateArray.filter((data, index, arr) => index == 1).map(mapp => mapp = mapp - 1);
        this.manipulateTime(element.localFromTime);
        // this.timeArray = element.fromTime.split("T");
        // this.timeArray = this.timeArray[1].split(".");
        // this.timeArray = this.timeArray[0].split(":");
        element.fromTime = new Date(this.dateArray[0], this.dateArray[1], this.dateArray[2], this.timeArray[0], this.timeArray[1]);
        //this.datepipe.transform( this.timeArray[0].substring(0,this.timeArray[0].length -3), 'hh:mm');
        this.manipulateTime(element.localToTime);
        // this.timeArray = element.toTime.split("T");
        // this.timeArray = this.timeArray[1].split(".");
        // this.timeArray = this.timeArray[0].split(":");
        element.toTime = new Date(this.dateArray[0], this.dateArray[1], this.dateArray[2], this.timeArray[0], this.timeArray[1]);
        this.temp3 = element;
        this.temp2.push(this.temp3);
        this.scheduleObj.eventSettings.dataSource = this.temp2;
        this.scheduleObj.refreshEvents();
        this.scheduleObj.refreshLayout();
        this.scheduleObj.refresh();
      });
      // this.temp2 = this.temp2.map((item,index) => item.id).filter((item,index,arr)=> arr.indexOf(item));
      this.scheduleObj.eventSettings.dataSource = this.temp2;
      this.scheduleObj.refreshEvents();
      this.scheduleObj.refreshLayout();
      this.scheduleObj.refresh();

      console.log("listOfPhysiciansAppointments" + this.listOfPhysiciansAppointments);
    })
  }
  manipulateTime(time: any): any[] {
    if (time != null) {
      if (time.includes("T"))
        this.timeArray = time.split("T");
      else
        if (time.includes("."))
          this.timeArray = this.timeArray[1].split(".");
        else
          if (time.includes(":"))
            this.timeArray = time.split(":");
    }

    return this.timeArray;

  }

  

  isTimeSlotAvailable() {
    // if (this.appoint.toTime != '' && this.appoint.fromTime != '' && this.appoint.date != '') {

    //   let tempAppoint = Object.assign(this.appoint);
    //   this.datepipe.transform(tempAppoint.toTime, 'yyyy-MM-ddTh:mm:ss');
    //   this.datepipe.transform(tempAppoint.fromTime, 'yyyy-MM-ddTh:mm:ss');
    //   this.restService.isTimeSlotAvailable(tempAppoint).subscribe((response) => {
    //     //this.listOfPhysicians = response;
    //     console.log("drop down " + response);
    //   })
    // }
  }


  event: object[] = [];
  public onEventRendered(args: EventRenderedArgs): void {
    console.log(this.endDate);
    //console.log(this.scheduleObj.getEvents())
    // let cellData = this.scheduleObj.workCellAction;
    // console.log(cellData);
    // this.event  = this.scheduleObj.getEvents();
    switch (args.data['EventType']) {
      case 'Requested':
        (args.element as HTMLElement).style.backgroundColor = '#F57F17';
        break;
      case 'Confirmed':
        (args.element as HTMLElement).style.backgroundColor = '#7fa900';
        break;
      case 'New':
        (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
        break;
    }

    // let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
    // let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
    // validator.addRules('description', { required: true });
    // validator.addRules('title', { required: true });
    // validator.addRules('patient', { required: true });
    // validator.addRules('physician', { required: true });
    // validator.addRules('date', { required: true });
    // validator.addRules('fromTime', { required: true });
    // validator.addRules('toTime', { required: true });

  }

  getPatientData() {
    this.restService.getPatientData(this.appoint.patient).subscribe((response) => {
      this.patientDetails = response;
      this.appoint.patient = this.appoint.patient + "-" + this.patientDetails.firstName + " " + this.patientDetails.lastName;
    })
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

  public onPopupClose(args: PopupOpenEventArgs) {
    this.startDate = new Date;
    this.endDate = new Date;

    let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
    let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
    validator.addRules('description', { required: true });
    validator.addRules('title', { required: true });
    validator.addRules('patient', { required: true });
    validator.addRules('physician', { required: true });
    validator.addRules('date', { required: true });
    validator.addRules('fromTime', { required: true });
    validator.addRules('toTime', { required: true });
    if (this.showReason)
      validator.addRules('reason', { required: true });

    if (this.saveEditInfo.id != undefined && this.saveEditInfo.id != null  && !this.isdeleteAction) {
      this.appointment = new Appointments();
      this.appointment.newData = new Appointments();
      this.appointment.newData.title = this.appoint['title'];
      this.appointment.newData.description = this.appoint.description;
      //this.appointment.newData.physician = this.saveEditInfo['physician'];
      this.appointment.newData.date = this.appoint.date
      console.log(!this.appoint.fromTime.toString().includes("AM"))
      if (checkValidDate(this.appoint.fromTime) && (!this.appoint.fromTime.toString().includes("AM") && !this.appoint.fromTime.toString().includes("PM"))) {
        var fromTime = this.datepipe.transform(this.appoint.fromTime, 'HH:mm')
        console.log(fromTime);
        this.appointment.newData.fromTime = fromTime;
      }
      else{
        this.appointment.newData.fromTime = this.appoint.fromTime;
      }
      if (checkValidDate(this.appoint.toTime) && (!this.appoint.toTime.toString().includes("AM") && !this.appoint.toTime.toString().includes("PM"))) {
        var toTime = this.datepipe.transform(this.appoint.toTime, 'HH:mm')
        console.log(toTime);
        this.appointment.newData.toTime = toTime;
      }else{
        this.appointment.newData.toTime = this.appoint.toTime;
      }
      
      
      this.appointment.newData.reason = this.appoint.reason;
      //this.appointment.newData.localFromTime = this.
      // this.appointment.newData.patient = this.saveEditInfo['patient']
      this.appointment.newData.id = this.saveEditInfo['id'];
      this.appointment.newData.deleteFlag = this.saveEditInfo.deleteFlag;
      this.appointment.newData.createdOn = this.saveEditInfo.createdOn;
      this.appointment.newData.createdBy = this.saveEditInfo.createdBy;

      this.appointment.newData.physician = this.saveEditInfo['physician'].employeeId
      this.appointment.newData.patient = this.saveEditInfo['patient'].patientId;
      this.appointment.newData.physicians = this.saveEditInfo['physician'];
      this.appointment.newData.patients = this.saveEditInfo['patient'];

      this.appointment.oldData = this.saveEditInfo;
      this.appointment.oldData.physicians = this.saveEditInfo['physician'];
      this.appointment.oldData.patients = this.saveEditInfo['patient'];
      this.appointment.oldData.physician = this.saveEditInfo['physician'].employeeId
      this.appointment.oldData.patient = this.saveEditInfo['patient'].patientId;
      this.appointment.oldData.status = this.appoint.status;



      this.restService.editAppointment(this.appointment).subscribe((response) => {
        alert("Appoinment updation successfully");
        console.log("drop down " + response);
        this.saveEditInfo = "";
        this.appointment.oldData.physicians = this.saveEditInfo['physician'];
        //this.temp = "";
        this.appointment.emp_id = this.appointment.oldData.physician.toString();
        this.getAllPhysiciansAppointments(this.appointment);
       // this.scheduleObj.refresh();
      })
    }

  }
  saveEditInfo: any = "";
  onPopupOpen(args: PopupOpenEventArgs): void {
    var temp = args.data;
    console.log("print " + args);
    console.log("temp " + temp)
    if (this.loggedInUser == 'ROLE_PHYSICIAN') {
      this.appoint.physician = this.tempUser;
    }
    if (this.loggedInUser != 'ROLE_PHYSICIAN') {
      this.appoint.status = 'Pending'
    }

    if (temp['id']) {

      let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
      let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
      validator.addRules('reason', { required: true });
      this.appoint.date = this.datepipe.transform(temp['fromTime'], 'yyyy-MM-dd');
      this.appoint.fromTime = this.datepipe.transform(temp['fromTime'], 'h:mm a');
      this.appoint.toTime = this.datepipe.transform(temp['toTime'], 'h:mm a');
      this.appoint.description = temp['description'];
      this.appoint.title = temp['title']
      var patient = temp['patient']
      this.appoint.patient = patient['patientId'] + "-" + patient['firstName'] + " " + patient['lastName'];
      var physcian = temp['physician']
      this.appoint.physician = physcian['employeeId'].toString();
      this.showReason = true;
      this.saveEditInfo = args.data;
    } else {
      this.appoint.title = "";
      this.appoint.patient = "";
      this.appoint.toTime = "";
      this.appoint.fromTime = "";
      this.appoint.description = "";
      this.appoint.date = this.datepipe.transform(temp['fromTime'], 'yyyy-MM-dd');
      this.appoint.fromTime = this.datepipe.transform(temp['fromTime'], 'h:mm a');
      this.appoint.toTime = this.datepipe.transform(temp['toTime'], 'h:mm a');
      //this.appoint.physician =  this.tempUser;
      this.showReason = false;
    }

    //No use of this code
    // if (args.type === 'Editor') {
    //   if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
    //     document.getElementById("EventType_Error").style.display = "none";
    //     document.getElementById("EventType_Error").style.left = "351px";
    //   }
    //   let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
    //   let statusElement: HTMLInputElement = args.element.querySelector('#EventType') as HTMLInputElement;
    //   if (!statusElement.classList.contains('e-dropdownlist')) {
    //     let dropDownListObject: DropDownList = new DropDownList({
    //       placeholder: 'Choose status', value: statusElement.value,
    //       dataSource: ['New', 'Requested', 'Confirmed'],
    //       select: function (args) {
    //         if (!isNullOrUndefined(document.getElementById("EventType_Error"))) {
    //           document.getElementById("EventType_Error").style.display = "none";
    //         }
    //       }
    //     });
    //     dropDownListObject.appendTo(statusElement);
    //     statusElement.setAttribute('name', 'EventType');
    //   }
    //   let validator: FormValidator = ((formElement as EJ2Instance).ej2_instances[0] as FormValidator);
    //   validator.addRules('description', { required: true });
    // }
  }

  public startDateParser(data: string): Date {

    if (isNullOrUndefined(this.startDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.startDate)) {
      return new Date(this.startDate);
    }
    return new Date();
  }

  public endDateParser(data: string): Date {
    //console.log("enddate "+data);
    if (isNullOrUndefined(this.endDate) && !isNullOrUndefined(data)) {
      return new Date(data);
    } else if (!isNullOrUndefined(this.endDate)) {
      return new Date(this.endDate);
    }
    return new Date();
  }

  public onDateChange(args: ChangeEventArgs): void {
    console.log("args " + args)
    // if (!isNullOrUndefined(args.event)) {
    //   if (args.element.id === "StartTime") {
    //     this.startDate = new Date(args.value);
    //   } else if (args.element.id === "EndTime") {
    //     this.endDate = args.value;
    //   }
    // }
  }
  data: any="";
  dataSource: any;
  tempArray: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  editAppointments : EditAppointmentDetails[]=[];
  editAppointment: EditAppointmentDetails= new EditAppointmentDetails();

  
  
  getDialogBoxData()
  {
    this.scheduleObj.refresh();
    this.saveEditInfo
    this.restService.getAllEditAppointments(this.saveEditInfo).subscribe((response) => {
      console.log(response);
      //Fetch keys from the Json Array
      // this.saveEditInfo = "";
      // response.forEach((key) => {
      //   Object.keys(key).forEach((key2) => {
      //     this.tempArray.push(key2);
      //   })
      response.forEach((element => {
        this.editAppointment.meetingId = element['appoinmentScheduling'].id;
        this.editAppointment.editReason =  element.editReason;
        this.editAppointment.previousFromTime = element.previousMeetingTime;
        this.editAppointment.previousToTime =element.previousMeetingDate;
        this.editAppointment.createdBy = element['hospitalUser'].firstName + " " + element['hospitalUser'].lastName;
      // })thi
        this.editAppointments.push(this.editAppointment);
      }));

    //  this.editAppointments = response;
      //Remove Duplicates 
      this.tempArray = [...new Set(this.tempArray)];

      // this.displayedColumns = this.tempArray;
      // console.log(this.displayedColumns)
    }
    );

    this.openDialogBox(this.editAppointments);
  }

  openDialogBox(editAppointments :EditAppointmentDetails[]){
    this.dialog.open(EditAppointmetDetaialsComponent,{
      width:'50%',
      data:editAppointments
    })
  }

  isdeleteAction:any=false;

  public onActionBegin(args: ActionEventArgs): void {
    // if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
    //   const data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
    //   if (!this.scheduleObj.isSlotAvailable(data['StartTime'] as Date, data['EndTime'] as Date)) {
    //     args.cancel = true;
    //   }
    // }

    this.temp = args.data;
    this.appointment.title = this.temp[0].title;
    this.appointment.description = this.temp[0]['description'];
    this.appointment.physician = this.temp[0]['physician']
    this.appointment.date = this.appoint.date
    this.appointment.fromTime = this.appoint.fromTime;
    this.appointment.toTime = this.appoint.toTime;
    this.appointment.reason = this.temp[0]['reason'];
    this.appointment.patient = this.temp[0]['patient']
    this.appointment.id = this.temp[0]['id'];
    this.appointment.deleteFlag = this.temp[0].deleteFlag;
    this.appointment.createdOn = this.temp[0].createdOn;
    this.appointment.createdBy = this.temp[0].createdBy;
    this.appointment.status = this.temp[0].status;

    if (args.requestType === 'eventRemove') {
      this.appointment.physician = this.temp[0]['physician'].employeeId
      this.appointment.patient = this.temp[0]['patient'].patientId;
      this.appointment.physicians = this.temp[0]['physician'];
      this.appointment.patients = this.temp[0]['patient'];
      this.isdeleteAction = true;
      this.restService.cancelAppointment(this.appointment).subscribe((response) => {
        let index = this.temp2.findIndex(data => data.id == this.appointment.id);
        this.temp2.splice(index, 1);
        this.scheduleObj.eventSettings.dataSource = this.temp2;
        alert("Appoinment Cancelled Successfully");
        this.isdeleteAction = false;
        console.log("drop down " + response);
      })
    }

    if (args.requestType === 'eventChange') {
      this.appointment.patient = this.temp[0]['patient'].patientId;
      this.appointment.physicians = this.temp[0]['physician'];
      this.appointment.patients = this.temp[0]['patient'];

      this.restService.editAppointment(this.appointment).subscribe((response) => {
        alert("Appoinment updation successfully");
        console.log("drop down " + response);
      })
    }

    if (args.requestType === 'eventCreate') {
      if (this.appoint.toTime != '' && this.appoint.fromTime != '' && this.appoint.date != '') {
       let timeDiff = this.appoint.toTime.valueOf() - this.appoint.fromTime.valueOf();
        let durationInHr = timeDiff / (1000 * 3600);
        if (durationInHr < 0) {
          this.scheduleObj.refresh();
          alert("End time cannot be less than Start Time");
          this.toaster.showError("End time cannot be less than Start Time", "Unsuccessful");
          return;
        }
        if (durationInHr > 1) {
          this.scheduleObj.refresh();
          alert("Appointment Duration Cannot be More than 1hr");
          this.toaster.showError("Appointment Duration Cannot be More than 1hr", "Unsuccessful");
          return;
        }

        let tempAppoint = Object.assign(this.appoint);
        // this.datepipe.transform(tempAppoint.toTime, 'yyyy-MM-ddTh:mm:ss');
        // this.datepipe.transform(tempAppoint.fromTime, 'yyyy-MM-ddTh:mm:ss');
        this.restService.isTimeSlotAvailable(this.appointment).subscribe((response) => {
          //this.listOfPhysicians = response;
          console.log("drop down " + response);
          if (response.length != 0) {
            alert("Slot already booked");
            this.toaster.showError("Slot already booked", "Unsuccessful");
            return;
          }
          this.isdeleteAction = true;
          this.restService.saveAppoinmnet(this.appointment).subscribe((response) => {
            //this.listOfPhysicians = response;
            console.log("drop down " + response);
            this.isdeleteAction = false;
          })
          let temp = "";
          this.listOfPhysicians.filter(f => f.emp_id == this.appointment.physician).forEach(element => {
            temp = element
          });
          console.log("temps" + temp);
          if (this.loggedInUser == 'ROLE_PHYSICIAN') {
            this.appointment.emp_id = this.tempUser;
            this.getAllPhysiciansAppointments(this.appointment);
          }
          
          this.getAllPhysiciansAppointments(temp);
        })
      }
    }

  }
  title = 'praticeSync';
}

function doctorsEventData(arg0: never[], doctorsEventData: any, arg2: null, arg3: boolean): Record<string, any>[] {
  throw new Error('Function not implemented.');
}




function moment(toTime: any) {
  throw new Error('Function not implemented.');
}

function checkValidDate(dateTime: any): boolean {
  if (Date.parse(dateTime) != NaN)
    return true;
  else
    return false;
}

