import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
/*
  Author: Nayana DK
*/
export class SidenavListComponent implements OnInit {
  
  @Output() sidenavClose = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  openLogin(i:number){
    this.sidenavClose.emit();
    const modalRef = this.modalService.open(LoginComponent);
    //if i==0, then patient login else HospitalUser login
    modalRef.componentInstance.isPatient = (i==0)?true:false
  }
  openRegister(){
    this.sidenavClose.emit();
    const modalRef = this.modalService.open(RegisterComponent);
  }
}
