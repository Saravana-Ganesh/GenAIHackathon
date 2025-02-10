import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  public action: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public dataObj: any,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    console.log("-------------")
    this.dialogRef.close();
  }

  onYesClick(dataObj: any) {
    if (this.dataObj.dataType == "Diagnosis" && this.dataObj.action == "delete") {
      console.log(dataObj)
      this.adminService.deleteDiagnosisData(dataObj.code)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Diagnosis Data deleted Successfully', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Diagnosis Data deleted Successfully");
            //this.getAllDiagnosisData();
            console.log(res);
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open('Error while deleting data', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            this.dialogRef.close("delete");
            //alert("Error while deleting record!!")
          }
        })
    } else if (this.dataObj.dataType == "Medication" && this.dataObj.action == "delete") {
      this.adminService.deleteMedicationData(dataObj.code)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Medication Data deleted Successfully', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Medication Data deleted Successfully");
            console.log(res);
          },
          error: (err) => {
            this.snackBar.open('Error while deleting record!!', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Error while deleting record!!")
          }
        })
    } else if (this.dataObj.dataType == "Procedure" && this.dataObj.action == "delete") {
      this.adminService.deleteProcedureData(dataObj.code)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Procedure Data deleted Successfully', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Procedure Data deleted Successfully");
            console.log(res);
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open('Error while deleting record!!', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Error while deleting record!!")
          }
        })
    } else if (this.dataObj.dataType == "Diagnosis" && this.dataObj.action == "deprecate") {
      this.adminService.deprecateDiagnosisData(dataObj.code)
        .subscribe({
          next: (res) => {
            this.snackBar.open('Diagnosis Data Deprecated', 'OK', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Diagnosis Data Deprecated");
            console.log(res);
          },
          error: (err) => {
            console.log(err);
            this.snackBar.open('Some error occurred', '', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Some error occurred")
          }
        })
    } else if (this.dataObj.dataType == "Medication" && this.dataObj.action == "deprecate") {
        this.adminService.deprecateMedicationData(dataObj.code)
          .subscribe({
            next: (res) => {
              this.snackBar.open('Medication Data Deprecated', 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              //alert("Medication Data Deprecated");
              console.log(res);
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open('Some error occurred', '', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              //alert("Some error occurred")
            }
          })
    } else if (this.dataObj.dataType == "Procedure" && this.dataObj.action == "deprecate") {
        this.adminService.deprecateProcedureData(dataObj.code)
          .subscribe({
            next: (res) => {
              this.snackBar.open('Procedure Data Deprecated', 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              //alert("Procedure Data Deprecated");
              console.log(res);
            },
            error: (err) => {
              console.log(err);
              this.snackBar.open('Some error occurred', '', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              //alert("Some error occurred")
            }
          })
    }
  }
}


