import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTDataContent } from '../models/data-model';
import jwt_decode from 'jwt-decode';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientVisitGaurd implements CanActivateChild {
  public jwtTokenObject: JWTDataContent;
  constructor(private sessionStorage:SessionStorageService){}

  ngOnInit(): void {
    let jwt = this.sessionStorage.getJwtToken();
    this.jwtTokenObject = jwt_decode(jwt);    
  }
  canActivateChild(
 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //alert('Child routegaurd calling')
      let jwtTokenObject:JWTDataContent = jwt_decode(window.sessionStorage.getItem("secure_token"));
      let arr = jwtTokenObject.username.split(",");

      console.log(window.sessionStorage.getItem('role'));
    if(window.sessionStorage.getItem('role')==("ROLE_PHYSICIAN" || "ROLE_NURSE")){
      return true;
    }
    return false;
    
  }
  
}

