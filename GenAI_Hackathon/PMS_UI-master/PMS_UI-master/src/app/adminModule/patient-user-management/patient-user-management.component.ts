import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-patient-user-management',
  templateUrl: './patient-user-management.component.html',
  styleUrls: ['./patient-user-management.component.css']
})
export class PatientUserManagementComponent implements AfterViewInit {
  displayedColumns: string[] = ['patientId', 'patientName', 'email', 'dateOfRegistration', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.getPatientUsersData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPatientUsersData() {
    this.adminService.getAllPatientUsers()
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

  sortNameAccessor(item: any, property: any) {
    if (property === 'patientName') {
      return item.firstName;
    } else {
      return item[property];
    }
  };

  deleteUser(id: number) {
    this.adminService.deleteHospitalUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User deleted Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user deleted Successfully");
        this.getPatientUsersData();
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

  activateUser(id: number) {
    this.adminService.activatePatientUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User activated Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user activated Successfully");
        this.getPatientUsersData();
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

  deactivateUser(id: number) {
    this.adminService.deactivatePatientUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User deactivated Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user deactivated Successfully");
        this.getPatientUsersData();
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

  blockUser(id: number) {
    this.adminService.blockPatientUser(id).subscribe({
      next: (res) => {
        this.snackBar.open('User blocked Successfully','OK',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("user blocked Successfully");
        this.getPatientUsersData();
      },
      error: () => {
        this.snackBar.open('Error while blocking the user','',{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        //alert("Error while blocking the user");
      }
    })
  }


}