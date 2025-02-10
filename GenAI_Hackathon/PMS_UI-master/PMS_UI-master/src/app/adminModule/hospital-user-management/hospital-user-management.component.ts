import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';
import { IHospitalUser } from '../model/HospitalUser';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-hospital-user-management',
  templateUrl: './hospital-user-management.component.html',
  styleUrls: ['./hospital-user-management.component.css']
})
export class HospitalUserManagementComponent implements OnInit {
  displayedColumns: string[] = ['employeeId', 'empName', 'emailId', 'role','doj', 'status', 'action'];
  dataSource: MatTableDataSource<any>;
  userData = [''];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private modalService: NgbModal,
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getHospitalUsersData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUser() {
    const modalRef = this.modalService.open(AddUserComponent);
    console.log(typeof modalRef.componentInstance);
  }

  openAddUserDialog() {
    this.dialog.open(AddUserComponent).afterClosed().subscribe(
      val => {
        if (val === 'save') {
          this.getHospitalUsersData();
        }
      }
    );

  }

  getHospitalUsersData() {
    this.adminService.getAllHospitalUsers()
      .subscribe({
        next: res => {
          this.dataSource = new MatTableDataSource(res);
          console.log(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sortingDataAccessor = this.sortNameAccessor;
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

  sortNameAccessor (item:any, property:any) {
    if (property === 'empName') {
      return item.firstName;
    } else {
      return item[property];
    }
  };

  editUser(row: any) {
    console.log("edit User pop")
    console.log(row);
    this.dialog.open(AddUserComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: row
    }).afterClosed().subscribe(
      val => {
        if (val === 'update') {
          this.getHospitalUsersData();
        }
      }
    );
  }

  deleteUser(id: number) {
    this.adminService.deleteHospitalUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('user deleted Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("User deleted Successfully");
        this.getHospitalUsersData();
      },
      error: () => {
        this.snackBar.open('Error while deleting the user','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while deleting the user");
      }
    })
  }

  activateUser(id:number){
    this.adminService.activateHospitalUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User activated Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user activated Successfully");
        this.getHospitalUsersData();
      },
      error: () => {
        this.snackBar.open('Error while activating the user','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while activating the user");
      }
    })
  }

  deactivateUser(id:number){
    this.adminService.deactivateHospitalUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User deactivated Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user deactivated Successfully");
        this.getHospitalUsersData();
      },
      error: () => {
        this.snackBar.open('Error while deactivating the user','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while deactivating the user");
      }
    })
  }

  blockUser(id:number){
    this.adminService.blockHospitalUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User blocked Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
       // alert("user blocked Successfully");
        this.getHospitalUsersData();
      },
      error: () => {
        this.snackBar.open('Error while deactivating the user','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while deactivating the user");
      }
    })
  }

}
