import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryService } from '../services/entry.service';
import { RegisterComponent } from '../register/register.component';
import { IUserLogin } from '../model/IUserLogin';
import { User } from '../model/User';
import { SessionStorageService } from 'src/app/sharedModule/services/session-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/patientVisitModule/models/api-model';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/*
  Author:Nayana DK
 */
export class LoginComponent implements OnInit, OnDestroy {

  public loginValid: boolean = true;
  public isPatient: boolean = true;
  public forgotPasswordText = "Forgot Password?"
  public isAccountLocked = false;
  public errorText = "";
  public isLoading = false;

  public loginForm !: FormGroup;
  public forgotPaswordForm !: FormGroup;
  public invalidPassword = false;
  public passwordInputType = "password";
  public checked = true;
  
  //Spinner properties
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private entryService: EntryService,
    private sessionStorage:SessionStorageService,
    private snackBar: MatSnackBar) { }
  ngOnDestroy() {

  }
  //Validators.email
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      //role: [this.isPatient ? 'Patient' : '', [Validators.required]]
    });
    this.forgotPaswordForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      role: [this.isPatient ? 'Patient' : '', [Validators.required]]
    })
  }
  userLogin!: IUserLogin;
  subscription!: Subscription
  forgetPassword: boolean = false;
  // loginUser(){
  //     this.userLogin = {
  //       "emailId": this.loginForm.value.email,
  //       "password" : this.loginForm.value.password,
  //       "roleId" :0
  //     };

  //    this.subscription = this.entryService.login(this.userLogin).subscribe({
  //     next:result=>{
  //       //some operation based on results
  //       const user:IUserLogin=result.find((a:any)=>{
  //         return a.email==this.loginForm.value.email && a.password==this.loginForm.value.password
  //       }); 
  //       if(user){
  //         alert("Login Success!!");
  //         this.loginForm.reset();
  //        // this.router.navigate(['dashboard'])
  //       }else{
  //         alert("user not found");
  //       }
  //     },
  //     error:err=>{
  //       console.log(err);
  //     }
  //   });
  // }

  user: User = new User();
  // user.emailId= this.loginForm.controls.emailId.value;
  
  appendRole(){
    return (this.isPatient)?"P":"H";
  }

  loginUser() {
    this.isLoading =  true;
    this.user = {
      "username": this.loginForm.value.username,
      "password": this.loginForm.value.password,
      //"roleId": this.loginForm.value.role,
    };

    let loginForm:IUserLogin = JSON.parse(JSON.stringify(this.loginForm.value));
    
    const loginData = {
     //email:loginForm.email+this.appendRole(),
     username:loginForm.username,
     password:loginForm.password,
     //role:loginForm.role
    }
    this.sessionStorage.saveUserData(loginData);
    this.subscription = this.entryService.loginUserFromRemote(loginData).subscribe({
      next: result => {
        this.isLoading =  false;
        if(result.statusCode==200){
          console.log(result);  
        this.sessionStorage.saveJwtToken(result);
        if(window.sessionStorage.getItem('role')=='ROLE_ADMIN'){
          this.router.navigate(['admin/dashboard'])
        }else{
          console.log("Login success");
          this.router.navigate(['dashboard'])
        }        
        this.activeModal.close();
        }else if(result.statusCode==401){
          this.errorText = result.statusMessage;
          this.invalidPassword = true;
        }
        else if(result.statusCode==403){
          this.errorText = result.statusMessage;
          this.isAccountLocked = true;
        }
        
      },
      error: err => {
        this.isLoading =  false;
        console.log(err);
        this.invalidPassword = true;
      }
    });
  }
  openPatientRegister() {
    const modalRef = this.modalService.open(RegisterComponent);
    this.activeModal.close();
  }
  clickForgetPasswordLink(): void {
    this.forgetPassword = !this.forgetPassword;
    if (this.forgetPassword) {
      this.forgotPasswordText = "Login";
    } else {
      this.forgotPasswordText = "Forgot Password";
    }
  }

  public clickForgotPassword(){
    this.isLoading =  true;
    this.entryService.forgotpassword( this.forgotPaswordForm.value.email).subscribe({      
      next:(result:ApiResponse)=>{
        this.isLoading =  false;
        this.snackBar.open(result.statusMessage,'OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert(result.statusMessage);      
      },
      error:(err)=>{
        this.isLoading =  false;
      }
    })
  }

  showOrHidePassword(){    
    this.passwordInputType = this.checked?'text':'password';   
    this.checked = !this.checked;
  }
  
}

