import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-diagnosis',
  templateUrl: './add-diagnosis.component.html',
  styleUrls: ['./add-diagnosis.component.css']
})
export class AddDiagnosisComponent implements OnInit {

  public diagnosisForm !: FormGroup;
  public actionBtn: string = "Add Data";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<AddDiagnosisComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.diagnosisForm = this.formBuilder.group({
      diagnosisCode: ['', Validators.required],
      diagnosisDescription: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update Data";
      this.diagnosisForm.controls['diagnosisCode'].setValue(this.editData.diagnosisCode),
      this.diagnosisForm.controls['diagnosisDescription'].setValue(this.editData.diagnosisDescription)
    }
  }

  addDiagnosisData() {
    if (!this.editData) {
    if (this.diagnosisForm.valid) {
      this.adminService.addDiagnosisData(this.diagnosisForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Diagnosis data added successfully!!','OK',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //alert("Diagnosis data added successfully!!");
          this.diagnosisForm.reset();
          this.dialogRef.close("save");
        },
        error: () => {
          this.snackBar.open('Error while adding data','',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //alert("Error while adding data")
        }
      })
    }
  } else {
    this.updateDiagnosisData();
  }
  }

  updateDiagnosisData(){
    if (this.diagnosisForm.valid) {
      this.adminService.updateDiagnosisData(this.diagnosisForm.value, this.editData.diagnosisCode)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Diagnosis data updated','OK',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("User data updated");
            this.diagnosisForm.reset();
            this.dialogRef.close("update");
          },
          error: () => {
            this.snackBar.open('Error while updating  data!!','',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Error while updating  data!!");
          }
        })
    }
  }


}
