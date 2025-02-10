import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { AdminService } from '../../service/admin.service';
import { AddDiagnosisComponent } from '../add-diagnosis/add-diagnosis.component';

@Component({
  selector: 'app-diagnosis-data',
  templateUrl: './diagnosis-data.component.html',
  styleUrls: ['./diagnosis-data.component.css']
})
export class DiagnosisDataComponent implements OnInit {

  displayedColumns: string[] = ['diagnosisCode', 'diagnosisDescription', 'isDeprecated', 'action'];
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
    this.getAllDiagnosisData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllDiagnosisData() {
    this.adminService.getAllDiagnosisData()
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

  openAddDiagnosisDataDialog() {
    this.dialog.open(AddDiagnosisComponent).afterClosed().subscribe(
      val => {
        if (val === 'save') {
          this.getAllDiagnosisData();
        }
      }
    );
  }

  editDiagnosisData(row: any) {
    this.dialog.open(AddDiagnosisComponent, {
      data: row
    }).afterClosed().subscribe(
      val => {
        if (val === 'update') {
          this.getAllDiagnosisData();
        }
      }
    );

  }

  deleteDiagnosisData(code: string) {
   let dataObj = {
     code:code,
     dataType:"Diagnosis",
     action:"delete"
   }
    this.openDialogBox(dataObj);
    // if (confirm('Are you sure to delete data?')) {
    //   this.adminService.deleteDiagnosisData(code)
    //     .subscribe({
    //       next: (res) => {
    //         this.snackBar.open('Diagnosis Data deleted Successfully','OK',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Diagnosis Data deleted Successfully");
    //         this.getAllDiagnosisData();
    //         console.log(res);
    //       },
    //       error: (err) => {
    //         console.log(err);
    //         this.snackBar.open('Error while adding data','',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Error while deleting record!!")
    //       }
    //     })
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
          this.getAllDiagnosisData();
      } 
    );
  }

  deprecateDiagnosisData(code: string) {
    let dataObj = {
      code:code,
      dataType:"Diagnosis",
      action:"deprecate"
    }
     this.openDialogBox(dataObj);
    //console.log(row);
    // if (confirm('Are you sure to deprecate data?')) {
    //   this.adminService.deprecateDiagnosisData(code)
    //     .subscribe({
    //       next: (res) => {
    //         this.snackBar.open('Diagnosis Data Deprecated','OK',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Diagnosis Data Deprecated");
    //         this.getAllDiagnosisData();
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



