import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { AdminService } from '../../service/admin.service';
import { AddMedicationComponent } from '../add-medication/add-medication.component';

@Component({
  selector: 'app-medication-data',
  templateUrl: './medication-data.component.html',
  styleUrls: ['./medication-data.component.css']
})
export class MedicationDataComponent implements OnInit {

  displayedColumns: string[] = ['drugId', 'drugName', 'drugGenericName', 'drugBrandName', 'drugForm', 'drugStrength','isDeprecated', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
    this.getAllMedicationData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllMedicationData(){
    this.adminService.getAllMedicationData()
      .subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res);
          console.log(res);
          this.dataSource.paginator = this.paginator;
          //this.dataSource.sortingDataAccessor = this.sortNameAccessor;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.snackBar.open('Error while fetching records!!','',{
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          //alert("Error while fetching records!!")
        }
      })
  }

  openAddMedicationDataDialog() {
    this.dialog.open(AddMedicationComponent).afterClosed().subscribe(
      val => {
        if (val === 'save') {
          this.getAllMedicationData();
        }
      }
    );
  }

  editMedicationData(row: any) {
    this.dialog.open(AddMedicationComponent, {
      data: row
    }).afterClosed().subscribe(
      val => {
        if (val === 'update') {
          this.getAllMedicationData();
        }
      }
    );

  }

  deleteMedicationData(code: string) {
    let dataObj = {
      code:code,
      dataType:"Medication",
      action:"delete"
    }
    this.openDialogBox(dataObj);
    // if(confirm('Are you sure to delete data?')){
    //   this.adminService.deleteMedicationData(code)
    //   .subscribe({
    //     next: (res) => {
    //       this.snackBar.open('Medication Data deleted Successfully','OK',{
    //         duration: 5000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //       });
    //       //alert("Medication Data deleted Successfully");
    //       this.getAllMedicationData();
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       this.snackBar.open('Error while deleting record!!','',{
    //         duration: 5000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //       });
    //       //alert("Error while deleting record!!")
    //     }
    //   })
    // }
  }

  openDialogBox(dataObj:any){
    // const dialogRef = this.dialog.open(DialogBoxComponent, {
    //   width: '25%',
    //   data: dataObj,
    // });

    this.dialog.open(DialogBoxComponent,{
      data:dataObj
    }).afterClosed().subscribe(
      result=>{
        this.getAllMedicationData();
      } 
    );
  }

  deprecateMedicationData(code: string) {
    let dataObj = {
      code:code,
      dataType:"Medication",
      action:"deprecate"
    }
    this.openDialogBox(dataObj);
    //console.log(row);
    // if (confirm('Are you sure to deprecate data?')) {
    //   this.adminService.deprecateMedicationData(code)
    //     .subscribe({
    //       next: (res) => {
    //         this.snackBar.open('Medication Data Deprecated','OK',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Medication Data Deprecated");
    //         this.getAllMedicationData();
    //         console.log(res);
    //       },
    //       error: (err) => {
    //         console.log(err);
    //         this.snackBar.open('Some error occurred','',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Some error occurred")
    //       }
    //     })
    // }
  }

}
