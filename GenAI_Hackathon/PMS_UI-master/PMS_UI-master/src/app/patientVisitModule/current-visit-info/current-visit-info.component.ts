import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from '../models/api-model';
import { CurrentVisitInfoData } from '../models/data-model';
import { VisitService } from '../services/visit.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DataSharingService } from '../services/data-sharing-service/data-sharing.service';
import { PatientVitalSignsComponent } from '../patient-vital-signs/patient-vital-signs.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'current-visit-info',
  templateUrl: './current-visit-info.component.html',
  styleUrls: ['./current-visit-info.component.css']
})
export class CurrentVisitInfoComponent implements OnInit {

  @Input() stepper!:MatStepper;
  @Input() nextComponent!:PatientVitalSignsComponent;

  displayedColumns: string[] = ['patientId', 'patientName','patientEmail','physicianName','physicianEmail','empId'];
  dataSource!: MatTableDataSource<CurrentVisitInfoData>;
  currentVisitInfoData:CurrentVisitInfoData[] = [];

  animal!: string;
  name!: string;


  patientId!:Number;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
      private visitService:VisitService, 
      private dialog: MatDialog, 
      private dataSharingService:DataSharingService,
      private router: Router,
      private activateRoute:ActivatedRoute
   ) { }
  ngOnInit(): void {
    let role = window.sessionStorage.getItem('role');
    if(role=='ROLE_PHYSICIAN'){ 
      this.displayedColumns = ['patientId', 'patientName','patientEmail','patientInfo'];
    }else if(role=='ROLE_PATIENT'){
      this.displayedColumns = ['physicianName','physicianEmail','empId'];
    }

    this.visitService.getCurrentVisitInfo().subscribe({
      next:(result:ApiResponse) =>{
        if(result.statusCode==200){
          this.currentVisitInfoData = result.responseData;
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(this.currentVisitInfoData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  clickOnPatientDat(row:any){
    console.log(row);
  }
  clickOnPatientData(row:CurrentVisitInfoData){

    this.openDialogBox(row);
  }
  openDialogBox(patientDetail:CurrentVisitInfoData){
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      data: patientDetail,
    });

    dialogRef.afterClosed().subscribe(result => {
      let patientDetail!:CurrentVisitInfoData;
      patientDetail = result;
      if(patientDetail!=undefined && patientDetail!= null){
        this.dataSharingService.setPatientDetail(patientDetail);
        this.moveNext();
      }     
    });
  }

  moveNext(){
    if(this.nextComponent!=undefined && this.nextComponent!=null){
      this.nextComponent.initialLoad();
    }
    this.stepper?.next();
  }

  showPatientInfo(id:any){
    this.router.navigate(['../patientDemographic',id],{relativeTo:this.activateRoute});
  }
}


