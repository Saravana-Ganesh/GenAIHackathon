import { Injectable } from '@angular/core';
import { Constants } from '../ApiConstants';
import jwt_decode from 'jwt-decode';
import { JWTDataContent } from '../models/data-model';
import { ApiResponse } from 'src/app/patientVisitModule/models/api-model';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  saveUserData(loginData:any)
  {
    window.sessionStorage.setItem("userdetails",JSON.stringify(loginData));
  }

  saveLoggedInUserData(user:any)
  {
    window.sessionStorage.setItem("loggedInUser",JSON.stringify(user));
  }

  getLoggedInUserData():any
  {
    return window.sessionStorage.getItem("loggedInUser") as any;
  }

  saveJwtToken(response:ApiResponse)
  {
    /* window.sessionStorage.setItem("secure_token",response.headers.get(Constants.SECURE_TOKEN));
    sessionStorage.removeItem("userdetails");
    this.saveUserInfoInSession();    */
    let data = JSON.parse(response.responseData.data);
    console.log(data);
    window.sessionStorage.setItem("secure_token",data.access_token);
    window.sessionStorage.setItem("userId",response.responseData.userId);
    this.saveUserInfoInSession(); 
  }

  destroySession()
  {
    sessionStorage.removeItem("userdetails");
    sessionStorage.removeItem("secure_token")
  }

  getJwtToken():string
  {
    return window.sessionStorage.getItem("secure_token") as string;
  }

  getUserData():string
  {
    return window.sessionStorage.getItem("userdetails") as string;
  }

  saveUserInfoInSession(){
     //Setting User related values in session
    let jwt:string = window.sessionStorage.getItem("secure_token");
    let jwtTokenObject:any = jwt_decode(jwt);
    console.log(jwtTokenObject)
    window.sessionStorage.setItem("username",jwtTokenObject.preferred_username);
    let roleArr = jwtTokenObject?.realm_access.roles;
    for(let i=0;i<roleArr.length;i++){
      if(roleArr[i].indexOf("ROLE_")!=-1){
        window.sessionStorage.setItem("role",roleArr[i]);
        break;
      }
    }
    //window.sessionStorage.setItem("DECODE_JWT",jwtTokenObject);
    /* let arr = jwtTokenObject.username.split(",");

    window.sessionStorage.setItem('role',jwtTokenObject.authorities);
    window.sessionStorage.setItem('id',arr[0])
    window.sessionStorage.setItem('email',arr[1]) */
  }
}
