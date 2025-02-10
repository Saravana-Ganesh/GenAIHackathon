import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../model/patient';
import { PatientModuleService } from '../services/patient-module.service';




@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  displayedColumns: string[] = ['patientId', 'firstName', 'lastName', 'emailId', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private router: Router, private patientService: PatientModuleService,
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let role = window.sessionStorage.getItem('role')
    if(role=='ROLE_PATIENT'){
      let id = window.sessionStorage.getItem('userId');
      this.router.navigate(['../patientDemographic',id],{relativeTo:this.activateRoute});
    }else{
      this.getPatientDetailList();
    }
   
  }

  private getPatientDetailList() {
   this.patientService.getPatientList().subscribe(data => {
    this.dataSource=new MatTableDataSource(data);
  });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  upadteDemographic(id: number) {
    this.router.navigate(['../patientDemographic',id],{relativeTo:this.activateRoute});
  }

}
