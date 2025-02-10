import { HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Constants } from '../ApiConstants';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor{

  userdata: any;
  jwtToken:string="";
  constructor(private router: Router,
              private sessionStorage:SessionStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("insde interceptor")
    // const userJson = sessionStorage.getItem('userdetails');
    // this.userdata = userJson !== null ? JSON.parse(userJson) : "";
    let httpHeaders = new HttpHeaders();

    // if(this.userdata && this.userdata.password && this.userdata.email){
    //   httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(this.userdata.email + ':' + this.userdata.password));
    // }
    if(this.sessionStorage.getJwtToken() != null && this.sessionStorage.getJwtToken() != undefined)
    {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer '+this.sessionStorage.getJwtToken());
    }
    if(this.sessionStorage.getLoggedInUserData() != null)
    {
      httpHeaders = httpHeaders.append(Constants.LOGGED_IN_USER, this.sessionStorage.getLoggedInUserData());
    }
    let basicAuth = req.clone({
        headers: httpHeaders
    })
    return next.handle(basicAuth).pipe(
      map((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse)
        {
          if((this.sessionStorage.getJwtToken() == null) || (this.sessionStorage.getJwtToken() == undefined)){
            console.log("evernt=====================")
            console.log(event);
           // this.sessionStorage.saveJwtToken(event);
          }         
        }
        return event;
       })
    );
  }
}