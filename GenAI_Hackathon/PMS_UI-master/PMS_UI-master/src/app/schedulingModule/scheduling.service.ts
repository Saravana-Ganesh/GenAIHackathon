import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receiver } from '../inboxModule/modal/Receiver';
import { Appointments } from '../inboxModule/modal/upcoming-appointments';
import { EditAppointmentDetails } from './modal/EditAppointment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService {

  edit:EditAppointmentDetails []= [];
    
  constructor(private httpService:HttpClient) { }

  saveAppoinmnet(appointment : any):Observable<any[]>
  {
    return this.httpService.post<any[]>(`/scheduling-service/scheduler/save/appointment`,appointment)
  }

  physiciansDropdownList():Observable<Receiver[]>
  {
    return this.httpService.get<Receiver[]>(`/scheduling-service/scheduler/getPhysicians`);
  }

  getPatientData(id:any):Observable<Receiver[]>
  {
    return this.httpService.get<Receiver[]>(`/scheduling-service/scheduler/getPatient/${id}`);
  }

  getPhysiciansAppoinments(data:any):Observable<any[]>
  {
    return this.httpService.post<any[]>(`/scheduling-service/scheduler/get/physician/appointment`,data);
  }

  isTimeSlotAvailable(data:any):Observable<any[]>
  {
    return this.httpService.post<any[]>(`/scheduling-service/scheduler/get/appointment/isTimeSlotBook`,data);
  }

  cancelAppointment(data:any):Observable<any[]>
  {
    return this.httpService.post<any[]>(`/scheduling-service/scheduler/cancel/appointment`,data);
  }
  
  fetchHospitalUserData(username:string):Observable<any>
  {
    return this.httpService.get<any>(`/scheduling-service/scheduler/get/hospitalUser/${username}`);
  }

  editAppointment(data:any):Observable<any>
  {
    return this.httpService.post<any>(`/scheduling-service/scheduler/edit/appointment`,data);
  }

  getAllEditAppointments(data:EditAppointmentDetails):Observable<any[]>
  {
    return this.httpService.post<any>(`/scheduling-service/scheduler/get/edit/appointments`,data);
   
  }
}
