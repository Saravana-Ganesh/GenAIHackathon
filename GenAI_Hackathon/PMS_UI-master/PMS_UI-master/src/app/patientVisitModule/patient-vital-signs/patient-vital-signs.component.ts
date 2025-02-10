import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { DiagnosisDetailsComponent } from '../diagnosis-details/diagnosis-details.component';
import { ApiResponse } from '../models/api-model';
import { VitalDetails } from '../models/data-model';
import { DataSharingService } from '../services/data-sharing-service/data-sharing.service';
import { VisitService } from '../services/visit.service';

@Component({
  selector: 'patient-vital-signs',
  templateUrl: './patient-vital-signs.component.html',
  styleUrls: ['./patient-vital-signs.component.css']
})
export class PatientVitalSignsComponent implements OnInit{

  @Input()stepper!:MatStepper;
  @Input()nextComponent!: DiagnosisDetailsComponent;

  private isDataPresentAlready = false;
  private vitalResponseData!:ApiResponse;
  private disable:boolean = false;
  constructor(
    private formBuilder:FormBuilder,
    private dataSharingService:DataSharingService,
    private visitService:VisitService,    
    private changeDetectorRef :ChangeDetectorRef) { }
  
    ngOnInit():void{
     
      this.initialLoad();
    }
 
  vitalFormGroup : FormGroup = this.formBuilder.group({
    height:new FormControl("", [Validators.required,Validators.max(250)]),
    weight:new FormControl("",[Validators.required]),
    bloodPressure:new FormControl("",[Validators.required]),
    bodyTemperature:new FormControl("",[Validators.required]),
    respirationRate:new FormControl("",[Validators.required]),    
  });

  initialLoad(){
    if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){
      this.disable = true;
    }
    this.isDataPresentAlready = false;
    this.changeDetectorRef.detectChanges();
  
      this.visitService.getVitalSignData(this.dataSharingService.getPatientDetail().patientId).subscribe({
        next:(result:ApiResponse)=>{
          if(result.statusCode==200){
            this.isDataPresentAlready = true;
            this.vitalResponseData = result;        
            this.drawVisitFormConent(result.responseData);
          }else{
            this.vitalFormGroup.reset();
            this.vitalFormGroup.clearValidators();
            this.dataSharingService.setVisitId(undefined);
            // this.vitalFormGroup.markAsPristine();
            // this.vitalFormGroup.markAsUntouched();
          }
          if(this.disable){
            this.vitalFormGroup.disable();
          }
        }
      });
  }

  drawVisitFormConent(responseData:VitalDetails){
    this.dataSharingService.setVisitId(responseData.visitId)
    this.vitalFormGroup.patchValue({
      height:responseData.height,
      weight:responseData.weight,
      bloodPressure:responseData.bloodPressure,
      bodyTemperature:responseData.bodyTemperature,
      respirationRate:responseData.respirationRate
    })
  }

  moveNextOnclick(){
    if(this.vitalFormGroup.valid){
      this.saveOrUpdateVitalSign();
    }else{
      this.vitalFormGroup.markAllAsTouched();
    }
    if(this.disable){
      this.moveNext();
    }    
  }
  moveprevious(){
    this.stepper?.previous();
  }

  saveOrUpdateVitalSign(){    
    
    if(!this.isDataPresentAlready || this.vitalFormGroup.dirty){
      let vitalDetailForm:VitalDetails = {
        patientId:this.dataSharingService.getPatientDetail().patientId,
        height: this.vitalFormGroup.value.height,
        weight: this.vitalFormGroup.value.weight,
        bloodPressure: this.vitalFormGroup.value.bloodPressure,
        bodyTemperature: this.vitalFormGroup.value.bodyTemperature,
        respirationRate: this.vitalFormGroup.value.respirationRate
      }

      this.visitService.saveOrUpdateVitalSign(vitalDetailForm).subscribe({
        next:(result:ApiResponse)=>{
          if(result.statusCode==200){
            this.dataSharingService.setVisitId(result.responseData.visitId);
            this.moveNext();
          }else{
            alert();
          }
        }
      })
    }else{
      this.moveNext();
    }
    
  }

  moveNext(){
    if(this.nextComponent!=undefined && this.nextComponent!=null){
      this.nextComponent.initialLoad();
    }
    this.stepper?.next();
  }
 
}
