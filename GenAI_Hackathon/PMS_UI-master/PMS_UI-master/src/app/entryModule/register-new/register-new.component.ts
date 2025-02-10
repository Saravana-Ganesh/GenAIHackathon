import { Component, ContentChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { IPatientRegister } from '../model/IPatientRegister';
import { EntryService } from '../services/entry.service';


@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.css'],
  providers: [
    NgbActiveModal,
  ]
})
export class RegisterNewComponent implements OnInit {

  public mobilePlaceHolder = "Mobile Number";
  public registerForm !: FormGroup;
  public mobileNumberValue = "";
  public maxDate = new Date();
  public passwordInputType = "password";
  public checked = true;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  mobileNumberfocusFunction() {
    this.mobilePlaceHolder = "";
  }

  mobileNumberfocusOutFunction() {
    console.log(this.mobileNumberValue)
    if (this.mobileNumberValue == null || this.mobileNumberValue.length == 0) {
      this.mobilePlaceHolder = "Mobile Number";
    }
  }

  passwordConfirming(abstarctControl: AbstractControl): { required: boolean } | null {
    if (abstarctControl?.get('password1')?.value !== abstarctControl?.get('password2')?.value) {
      return { required: true };
    }
    return null;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: [''],
      dateOfBirth: ['', Validators.required],
      //mobileNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      username: [''],
      passwords: this.formBuilder.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: this.passwordConfirming }
      ),

      // password:['',[Validators.required]],
      // password2:['',[Validators.required]],
      phoneNumber: [''],
      countryCode: ['+1'],
      title: ['Mr', [Validators.required]]
    }

    )
  }

  registerPatient() {
    console.log(JSON.stringify(this.registerForm.value));
    let registerSubmitForm: IPatientRegister = JSON.parse(JSON.stringify(this.registerForm.value));

    if (registerSubmitForm.passwords.confirmPassword == registerSubmitForm.passwords.password) {
      const registerData: any = {

        title: registerSubmitForm.title,
        firstName: registerSubmitForm.firstName,
        lastName: registerSubmitForm.lastName,
        emailId: registerSubmitForm.emailId,
        dateOfBirth: registerSubmitForm.dateOfBirth,
        phoneNumber: registerSubmitForm.phoneNumber,
        countryCode: '+1',
        currentPassword: registerSubmitForm.passwords.confirmPassword,
        userName: registerSubmitForm.username

        // password: this.registerForm.controls.password.value,
      }
      console.log(this.registerForm);
      if (this.registerForm.valid) {
        this.entryService.registerPatient(registerData).subscribe((data) => {
          console.log(data);
          if (data.statusCode == 200) {
            this.snackBar.open('Registration is Successfull','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
           //alert("Registered Successfully");
            //this.registerForm.clearValidators();
            //this.registerForm.markAsPristine();
            this.registerForm.reset();
            this.validRegisterForm();
            //this.registerForm.markAsPristine()
            //this.registerForm.markAsUntouched();
            //this.registerForm.setErrors(null);
            
            this.openPatientLogin();
          } else {
            alert("User Already Exists");
          }
          if (data !== null) {
            this.router.navigate(['']);
          }
        });
      } else {
        return;
      }
    }
  }


  openPatientLogin() {
    const modalRef = this.modalService.open(LoginComponent, {
      windowClass: 'customLoginModalClass'
    });
    // modalRef.componentInstance.NgbActiveModal.styleUrls = "./"
    // (<LoginComponent>modalRef.componentInstance).d
    this.activeModal.close();
  }
  
  showOrHidePassword(){    
    this.passwordInputType = this.checked?'text':'password';   
    this.checked = !this.checked;
  }

  validRegisterForm(){
    this.registerForm.get('firstName').setErrors(null);
    this.registerForm.get('lastName').setErrors(null);
    this.registerForm.get('emailId').setErrors(null);
    this.registerForm.get('dateOfBirth').setErrors(null);
    this.registerForm.get('username').setErrors(null);
    this.registerForm.get('phoneNumber').setErrors(null);
    this.registerForm.get('passwords').get('password').setErrors(null);
    this.registerForm.get('passwords').get('confirmPassword').setErrors(null);
    this.registerForm.get('countryCode').setErrors(null);
    this.registerForm.get('title').setErrors(null);
  }

}
