import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EntryService } from 'src/app/entryModule/services/entry.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public passwordInputType = "password";
  public checked = true;


  public changePaswordForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private entryService: EntryService,
    private router: Router,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.changePaswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    })
  }

  changePassword() {
    const passwordData = {
      username: window.sessionStorage.getItem("username"),
      password: this.changePaswordForm.value.newPassword,
    }

    this.entryService.changePassword(passwordData).subscribe({
      next: (res) => {
        this.snackBar.open('Password changed Successfully!!','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Password changed SUccessfully!!");
        this.changePaswordForm.reset();
        this.dialogRef.close("change");
      },
      error: () => {
        this.snackBar.open('Error while cahnging password!!','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while cahnging password!!");
      }
    })
  }

  showOrHidePassword(){    
    this.passwordInputType = this.checked?'text':'password';   
    this.checked = !this.checked;
  }

  // toggleShow() {
  //   this.showPassword = !this.showPassword;
  //   this.input.type = this.showPassword ? 'text' : 'password';
  // }



}
