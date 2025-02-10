import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.css']
})
export class AddProcedureComponent implements OnInit {

  public procedureForm !: FormGroup;
  public actionBtn: string = "Add Data";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<AddProcedureComponent>,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.procedureForm = this.formBuilder.group({
      procedureCode: ['', Validators.required],
      procedureDescription: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update Data";
      this.procedureForm.controls['procedureCode'].setValue(this.editData.procedureCode),
      this.procedureForm.controls['procedureDescription'].setValue(this.editData.procedureDescription)
    }
  }

  addProcedureData() {
    if (!this.editData) {
    if (this.procedureForm.valid) {
      this.adminService.addProcedureData(this.procedureForm.value).subscribe({
        next: (res) => {
          this.snackBar.open('Procedure data added successfully!!','OK',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //alert("Procedure data added successfully!!");
          this.procedureForm.reset();
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
    this.updateProcedureData();
  }
  }

  updateProcedureData(){
    if (this.procedureForm.valid) {
      this.adminService.updateProcedureData(this.procedureForm.value, this.editData.procedureCode)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Procedure Data Updated','OK',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("User data updated");
            this.procedureForm.reset();
            this.dialogRef.close("update");
          },
          error: () => {
            this.snackBar.open('Error while adding data','',{
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
