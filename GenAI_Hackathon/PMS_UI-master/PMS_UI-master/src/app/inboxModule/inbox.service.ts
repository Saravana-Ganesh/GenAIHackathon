import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { IUserLogin } from '../entryModule/model/IUserLogin';
import { Receiver } from './modal/Receiver';
import { SendNote } from './modal/SendNote';
import { Appointments } from './modal/upcoming-appointments';

@Injectable({
  providedIn: 'root'
})
export class InboxService {
  

  constructor(private httpService:HttpClient) { }

  getUpcomingAppointments():Observable<Appointments[]>
  {
    //return this.httpService.get<UpcomingAppointments[]>(`${Constants.API_URL}UpcomingAppointments`)
   // return this.httpService.get<UpcomingAppointments[]>("pms/UpcomingAppointments")
   if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){
   console.log("role is ",window.sessionStorage.getItem('role'));
    return this.httpService.get<Appointments[]>("inbox/pms/UpcomingAppointments/"+window.sessionStorage.getItem('username'))
   }
   if(window.sessionStorage.getItem('role')=='ROLE_PHYSICIAN'){
    console.log("role is ",window.sessionStorage.getItem('role'));
     return this.httpService.get<Appointments[]>("inbox/pms/UpcomingAppointments/physician/"+window.sessionStorage.getItem('username'))
    }
    return this.httpService.get<Appointments[]>("inbox/pms/UpcomingAppointments/nurse")
  }

  getDeclinedAppointments():Observable<Appointments[]>
  {
    //return this.httpService.get<UpcomingAppointments[]>(`${Constants.API_URL}UpcomingAppointments`)
   // return this.httpService.get<UpcomingAppointments[]>("pms/UpcomingAppointments")
    return this.httpService.get<Appointments[]>("inbox/pms/declinedAppointments")
  }

  saveSendNotes(data :SendNote []):Observable<SendNote[]>
  {
    var userNam;
    console.log("In service",data);
    return this.httpService.post<any[]>(`inbox/pms/sendMessages`,data);
  }

  fetchReceivedNotes()
  {
   // var userName = 'ganesh@gmail.com';
    return this.httpService.get<SendNote[]>(`inbox/pms/receivedMessages/`+window.sessionStorage.getItem('username'));
  }

  fetchSentNotes(){
    //var userName = 'ganesh@gmail.com';
    return this.httpService.get<SendNote[]>(`inbox/pms/sentMessages/`+window.sessionStorage.getItem('username'));
  }

  fetchReceiverDropDown()
  {
    return this.httpService.get<Receiver[]>(`inbox/pms/receiverDropDown`);
  }
  
  deleteMessageById(id:number):Observable<any>{
    console.log("deleteMessageById: Id="+id);
    return this.httpService.get(`inbox/pms/deleteNotes/${id}`);
  }
}
