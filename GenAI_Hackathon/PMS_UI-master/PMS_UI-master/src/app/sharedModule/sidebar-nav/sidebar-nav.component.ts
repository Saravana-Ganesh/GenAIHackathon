import { Component, OnInit } from '@angular/core';
import { JWTDataContent } from '../models/data-model';
import jwt_decode from 'jwt-decode';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {

  public userName: string;
  public email: string;
  public jwtTokenObject:any;
  public role: string;

  constructor(private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    let jwt = this.sessionStorage.getJwtToken();
    this.jwtTokenObject = jwt_decode(jwt);
    console.log(this.jwtTokenObject);
    //let arr = this.jwtTokenObject.username.split(",");
    //this.userName = arr[2]+" "+arr[3];
    /* console.log(arr[3])
    this.email = arr[1];
     
    let roleArr = this.jwtTokenObject?.realm_access.roles;
    for(let i=0;i<roleArr.length;i++){
      if(roleArr[i].indexOf("ROLE_")!=-1){
        this.role = roleArr[i];
        window.sessionStorage.setItem("role",this.role);
        break;
      }
    }*/
    this.role = window.sessionStorage.getItem('role');
    console.log(this.jwtTokenObject.authorities);
    if (this.role == 'ROLE_PHYSICIAN') {
      this.userName = 'Dr.' + this.jwtTokenObject?.name;
    }else if (this.role == 'ROLE_NURSE'|| this.role == 'ROLE_PATIENT') {
      this.userName = this.jwtTokenObject?.name;
    }
  }

}
