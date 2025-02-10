import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IHospitalUser } from '../model/HospitalUser';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public mobilePlaceHolder = "Mobile Number";
  public registerForm !: FormGroup;
  public mobileNumberValue = "";
  public maxDate = new Date();
  public actionBtn: string = "Register User";
  public isSpinnerEnabled = false;
  public specialization: string[] = [
    "Neurology",
    "Nuclear medicine",
    "Psychiatry",
    "Dermatologist",
    "Cardiologist",
    "Others"
  ];
//Spinner properties
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(
    // public activeModal: NgbActiveModal,
    //private modalService: NgbModal, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: [''],
      dateOfBirth: ['', Validators.required],
      //mobileNumber:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      phoneNumber: [''],
      countryCode: ['3'],
      title: ['1', [Validators.required]],
      roleId: ['1', Validators.required],
      specialization: [''],
      employeeId: ['']
    });
    if (this.editData) {
      console.log("edit user in add user")
      console.log(this.editData);
      this.actionBtn = "Update";
      this.registerForm.controls['firstName'].setValue(this.editData.firstName);
      this.registerForm.controls['lastName'].setValue(this.editData.lastName);
      this.registerForm.controls['emailId'].setValue(this.editData.emailId);
      this.registerForm.controls['dateOfBirth'].setValue(this.editData.dateOfBirth);
      this.registerForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.registerForm.controls['countryCode'].setValue(this.editData.countryCode);
      this.registerForm.controls['title'].setValue(this.editData.title);
      this.registerForm.controls['roleId'].setValue(this.editData.role.roleId);
      this.registerForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.registerForm.controls['specialization'].setValue(this.editData.specialization);
      console.log("form value")
      console.log(this.registerForm.value);
      this.mobileNumberValue = this.editData.phoneNumber;
      this.mobileNumberfocusFunction();
    }
  }
 
  mobileNumberfocusFunction() {
    this.mobilePlaceHolder = "";
  }

  mobileNumberfocusOutFunction() {
    console.log(this.mobileNumberValue)
    if (this.mobileNumberValue == null || this.mobileNumberValue.length == 0) {
      this.mobilePlaceHolder = "Mobile Number";
    }
  }

  
  registerUser() {
    console.log(this.registerForm.value);
    this.isSpinnerEnabled = true;
    if (!this.editData) {
      console.log(this.registerForm.valid)
      if (this.registerForm.valid) {
        this.adminService.registerHospitalUser(this.registerForm.value).subscribe({
          next: (res) => {
             this.isSpinnerEnabled = false;
            this.snackBar.open('User registered successfully!!','',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });                          
            this.registerForm.reset();
            this.dialogRef.close("save");
            // this.activeModal.close();
          },
          error: () => {
            this.isSpinnerEnabled = false;
            this.snackBar.open('Error while registering user','OK',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
          }
        })
      }

    } else {
      this.updateUser();
    }
  }

  updateUser() {
    console.log("edit data in update()");
    console.log(this.editData);
      console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      
      this.adminService.updateHospitalUser(this.registerForm.value, this.editData.employeeId)
        .subscribe({
          next: (res) => {
            this.snackBar.open('User data updated','OK',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("User data updated");
            this.registerForm.reset();
            this.dialogRef.close("update");
          },
          error: () => {
            this.snackBar.open('Error while updating user data!!','',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Error while updating user data!!");
          }
        })
    }

  }


}


