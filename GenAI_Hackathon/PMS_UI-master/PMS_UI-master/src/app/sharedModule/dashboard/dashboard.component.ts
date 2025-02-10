import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from 'src/app/entryModule/register/register.component';
import { Constants } from '../ApiConstants';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  constructor(
    private router:Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl('/welcome');
  }

  changePassword(){
    this.dialog.open(ChangePasswordComponent);
  }

}
