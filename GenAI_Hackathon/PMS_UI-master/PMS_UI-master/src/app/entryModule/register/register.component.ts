import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { IPatientRegister } from '../model/IPatientRegister';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
/*
    Author : Nayana
*/
export class RegisterComponent implements OnInit {
  public mobilePlaceHolder = "Mobile Number";
  public registerForm ! :FormGroup;
  public mobileNumberValue = "";
  public maxDate = new Date();
  
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder:FormBuilder,
    private entryService:EntryService,
    private router:Router 
  ) { }

  mobileNumberfocusFunction(){
    this.mobilePlaceHolder ="";
  }

  mobileNumberfocusOutFunction(){
    console.log(this.mobileNumberValue)
    if(this.mobileNumberValue==null || this.mobileNumberValue.length == 0){
      this.mobilePlaceHolder = "Mobile Number";
    }
  }

  passwordConfirming(abstarctControl: AbstractControl): { required: boolean } | null {
    if (abstarctControl?.get('password1')?.value !== abstarctControl?.get('password2')?.value) {
        return {required: true};
    }
    return null;
  }
 
  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      emailId:['',[Validators.required,Validators.email]],
      dateOfBirth:['',Validators.required],
      //mobileNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      passwords: this.formBuilder.group(
                  {
                      password: ['', [Validators.required]],
                      confirmPassword: ['', [Validators.required]],
                  }, 
                  {validator: this.passwordConfirming}
                  ),

                  // password:['',[Validators.required]],
                  // password2:['',[Validators.required]],
      phoneNumber:[''],
      countryCode:['+1'],
      title:['Mr',[Validators.required]]            
    }

    )
  }

  registerPatient() { 
    console.log(JSON.stringify(this.registerForm.value));
    let registerSubmitForm:IPatientRegister = JSON.parse(JSON.stringify(this.registerForm.value));

    if(registerSubmitForm.passwords.confirmPassword==registerSubmitForm.passwords.password){
      const registerData :any= {

        title: registerSubmitForm.title,
        firstName: registerSubmitForm.firstName,
        lastName:registerSubmitForm.lastName,
        emailId:registerSubmitForm.emailId,
        dateOfBirth:registerSubmitForm.dateOfBirth,
        phoneNumber:registerSubmitForm.phoneNumber,
        countryCode:'+1',
        currentPassword:registerSubmitForm.passwords.confirmPassword
  
       // password: this.registerForm.controls.password.value,
      }
      console.log(this.registerForm);
      if(this.registerForm.valid){
        this.entryService.registerPatient(registerData).subscribe((data) => {
          console.log(data);
          if(data.statusCode==200){
            alert("Registered Successfully");
          }else{
            alert("User Already Exists");
          }
          if (data  !== null) {
            this.router.navigate(['']);
          }
        });
      }else{
        return;
      }
    }          
  }
  
  
  openPatientLogin(){
    const modalRef = this.modalService.open(LoginComponent,{
      windowClass : 'customLoginModalClass'
    });
    // modalRef.componentInstance.NgbActiveModal.styleUrls = "./"
    // (<LoginComponent>modalRef.componentInstance).d
    this.activeModal.close();
  }
}
