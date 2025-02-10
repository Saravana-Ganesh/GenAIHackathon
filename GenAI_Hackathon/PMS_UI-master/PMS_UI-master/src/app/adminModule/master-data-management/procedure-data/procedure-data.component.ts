import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../../dialog-box/dialog-box.component';
import { AdminService } from '../../service/admin.service';
import { AddProcedureComponent } from '../add-procedure/add-procedure.component';

@Component({
  selector: 'app-procedure-data',
  templateUrl: './procedure-data.component.html',
  styleUrls: ['./procedure-data.component.css']
})
export class ProcedureDataComponent implements OnInit {

  displayedColumns: string[] = ['procedureCode', 'procedureDescription','isDeprecated','action'];
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
    this.getAllProcedureData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProcedureData() {
    this.adminService.getAllProcedureData()
      .subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res);
          //console.log(res);
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

  openAddProcedureDataDialog() {
    this.dialog.open(AddProcedureComponent).afterClosed().subscribe(
      val => {
        if (val === 'save') {
          this.getAllProcedureData();
        }
      }
    );
  }

  editProcedureData(row: any) {
    this.dialog.open(AddProcedureComponent, {
      data: row
    }).afterClosed().subscribe(
      val => {
        if (val === 'update') {
          this.getAllProcedureData();
        }
      }
    );

  }

  deleteProcedureData(code: string) {
    let dataObj = {
      code:code,
      dataType:"Procedure",
      action:"delete"
    }
    this.openDialogBox(dataObj);
    // if(confirm('Are you sure to delete data?')){
    //   this.adminService.deleteProcedureData(code)
    //   .subscribe({
    //     next: (res) => {
    //       this.snackBar.open('Procedure Data deleted Successfully','OK',{
    //         duration: 5000,
    //         horizontalPosition: 'center',
    //         verticalPosition: 'top',
    //       });
    //       //alert("Procedure Data deleted Successfully");
    //       this.getAllProcedureData();
    //       console.log(res);
    //     },
    //     error: (err) => {
    //       console.log(err);
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
        this.getAllProcedureData();
      } 
    );
  }

  deprecateProcedureData(code: string) {
    let dataObj = {
      code:code,
      dataType:"Procedure",
      action:"deprecate"
    }
    this.openDialogBox(dataObj);
    // if (confirm('Are you sure to deprecate data?')) {
    //   this.adminService.deprecateProcedureData(code)
    //     .subscribe({
    //       next: (res) => {
    //         this.snackBar.open('Procedure Data Deprecated','OK',{
    //           duration: 5000,
    //           horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //         });
    //         //alert("Procedure Data Deprecated");
    //         this.getAllProcedureData();
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
