import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../sharedModule/shared.module';
import { PatientVisitComponent } from './patient-visit/patient-visit.component';
import { ProcedureDetailsComponent } from './procedure-details/procedure-details.component';
import { MedicationDetailsComponent } from './medication-details/medication-details.component';
import { PatientVitalSignsComponent } from './patient-vital-signs/patient-vital-signs.component';
import { DiagnosisDetailsComponent } from './diagnosis-details/diagnosis-details.component';
import { CurrentVisitInfoComponent } from './current-visit-info/current-visit-info.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { PatientVisitGaurd } from '../sharedModule/gaurds/patient-visit.gaurd';



@NgModule({
  declarations: [
    PatientVisitComponent,
    ProcedureDetailsComponent,
    MedicationDetailsComponent,
    PatientVitalSignsComponent,
    DiagnosisDetailsComponent,
    CurrentVisitInfoComponent,
    DialogBoxComponent 
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  
})
export class PatientVisitModule { }
