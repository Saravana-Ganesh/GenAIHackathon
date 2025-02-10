import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.css']
})
export class AddMedicationComponent implements OnInit {

  public medicationForm !: FormGroup;
  public actionBtn: string = "Add Data";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<AddMedicationComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.medicationForm = this.formBuilder.group({
      drugId: ['', Validators.required],
      drugName: ['', Validators.required],
      drugGenericName: ['', Validators.required],
      drugBrandName: ['', Validators.required],
      drugForm: ['', Validators.required],
      drugStrength: ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = "Update Data";
      this.medicationForm.controls['drugId'].setValue(this.editData.drugId),
      this.medicationForm.controls['drugName'].setValue(this.editData.drugName),
      this.medicationForm.controls['drugGenericName'].setValue(this.editData.drugGenericName),
      this.medicationForm.controls['drugBrandName'].setValue(this.editData.drugBrandName),
      this.medicationForm.controls['drugForm'].setValue(this.editData.drugForm),
      this.medicationForm.controls['drugStrength'].setValue(this.editData.drugStrength)
    }
  }

  addMedicationData(){
    if (!this.editData) {
      if (this.medicationForm.valid) {
        this.adminService.addMedicationData(this.medicationForm.value).subscribe({
          next: (res) => {
            this.snackBar.open('Medication data added successfully!!','OK',{
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            //alert("Medication data added successfully!!");
            this.medicationForm.reset();
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
      this.updateMedicationData();
    }
    }
  
    updateMedicationData(){
      if (this.medicationForm.valid) {
        this.adminService.updateMedicationData(this.medicationForm.value, this.editData.drugId)
          .subscribe({
            next: (res) => {
              this.snackBar.open('Medication data updated successfully!!','OK',{
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
              //alert("User data updated");
              this.medicationForm.reset();
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
