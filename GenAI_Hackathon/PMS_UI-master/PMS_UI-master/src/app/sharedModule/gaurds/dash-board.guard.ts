import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoardGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,private activateRoute:ActivatedRoute) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (window.sessionStorage.getItem('role') != null) {
      return true;
    }
    this.router.navigateByUrl('welcome')
    return false;

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //alert("HEYY " + state.url);
    let role:string = window.sessionStorage.getItem('role');

    if (state.url.includes('patientDetails')) {
     
      //alert('[patientDetails tab')
      if (role == ("ROLE_NURSE") || role == "ROLE_PATIENT") {
        return true;
      }
      else  if (window.sessionStorage.getItem('role') == ("ROLE_PHYSICIAN")){
        this.router.navigate(['/dashboard/inbox']);
      }else{
        this.router.navigateByUrl('pageNotFound');
      }
    } else if (state.url.includes('patientVisit')) {
      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE" || role == "ROLE_PATIENT") {
        return true;
      }
    } else if (state.url.includes('physicianSchedule')) {
      if (role == "ROLE_PHYSICIAN" || role =="ROLE_NURSE" || role == "ROLE_PATIENT") {
        return true;
      }
    } else if (state.url.includes('inbox')) {
      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }

    }else if (state.url.includes('declineAppointments')) {
      if (role=="ROLE_PATIENT") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }

    }else if(state.url.includes('patientDemographic')){

      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE" || role=="ROLE_PATIENT") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }

    }else if (state.url.includes('sent-notes')) {
      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }
    }else if (state.url.includes('send-notes')) {
      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }
    }else if (state.url.includes('received-notes')) {
      if (role == "ROLE_PHYSICIAN" || role == "ROLE_NURSE") {
        return true;
      }else{
        this.router.navigateByUrl('pageNotFound');
      }
    }

    return false;

  }

}
