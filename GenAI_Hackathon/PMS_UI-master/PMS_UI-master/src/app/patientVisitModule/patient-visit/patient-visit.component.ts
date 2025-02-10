import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DiagnosisDetailsComponent } from '../diagnosis-details/diagnosis-details.component';
import { MedicationDetailsComponent } from '../medication-details/medication-details.component';
import { PatientVitalSignsComponent } from '../patient-vital-signs/patient-vital-signs.component';
import { ProcedureDetailsComponent } from '../procedure-details/procedure-details.component';

@Component({
  selector: 'app-patient-visit',
  templateUrl: './patient-visit.component.html',
  styleUrls: ['./patient-visit.component.css']
})
export class PatientVisitComponent implements AfterViewInit  {

  @ViewChild(ProcedureDetailsComponent) public procedureDetailsComponent!:ProcedureDetailsComponent;
  @ViewChild(PatientVitalSignsComponent) public patientVitalSignsComponent!:PatientVitalSignsComponent;
  @ViewChild(DiagnosisDetailsComponent) public diagnosisDetailsComponent!: DiagnosisDetailsComponent;
  @ViewChild(MedicationDetailsComponent) public medicationDetailsComponent!:MedicationDetailsComponent;

  vitalFormGroup! : FormGroup;
  diagnosisFormGroup! :FormGroup;
  procedureFormGroup!:FormGroup;
  medicationFormGroup!:FormGroup;

  constructor(private changeDetectorRef :ChangeDetectorRef){}

  ngAfterViewInit(): void {
    // this.vitalFormGroup = this.patientVitalSignsComponent.vitalFormGroup;
    // this.diagnosisFormGroup = this.diagnosisDetailsComponent.diagnosisFormGroup
    // this.procedureFormGroup = this.procedureDetailsComponent.procedureFormGroup;
    // this.medicationFormGroup = this.medicationDetailsComponent.medicationFormGroup;
    this.changeDetectorRef.detectChanges();
  }
  // stepChanged(event: any, stepper: any){
  //  // stepper.selected.interacted = false;
  // }

}
