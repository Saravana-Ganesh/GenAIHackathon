import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { EntryRoutes } from './patient-detail-routing';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientDemographicsComponent } from './patient-demographics/patient-demographics.component';


@NgModule({
  declarations: [
    PatientDetailsComponent,
    PatientDemographicsComponent    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EntryRoutes)
  ],
  exports:[
    
  ]
})
export class PatientDetailModule { }
