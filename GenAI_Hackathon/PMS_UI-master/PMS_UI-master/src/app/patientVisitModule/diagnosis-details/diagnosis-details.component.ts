import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ApiResponse, SearchContent } from '../models/api-model';
import { DiagnosisData, PatientDiagnosisInfo } from '../models/data-model';
import { ProcedureDetailsComponent } from '../procedure-details/procedure-details.component';
import { DataSharingService } from '../services/data-sharing-service/data-sharing.service';
import { VisitService } from '../services/visit.service';

@Component({
  selector: 'diagnosis-details',
  templateUrl: './diagnosis-details.component.html',
  styleUrls: ['./diagnosis-details.component.css']
})
export class DiagnosisDetailsComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private visitService:VisitService,
    private dataSharingService:DataSharingService,
    private snackBar: MatSnackBar
  ) { }

  diagnosisCodefilteredOptions!:string[];
  diagnosisDescriptionfilteredOptions!:string[];
  diagnosisCodeOptions: string[] = [];
  diagnosisDescripionOptions:string[] = [];
  diagnosisData!: DiagnosisData[];
  
  @Input() stepper!:MatStepper;
  @Input() nextComponent:ProcedureDetailsComponent;

  private isDataPresentAlready = false;
  private visitId!:any;
  public disable = false;
  public role = window.sessionStorage.getItem('role');
  public nextButton = 'Next'

  diagnosisFormGroup :FormGroup = this.formBuilder.group({
    diagnosisForm : this.formBuilder.array([this.buildDiagnosis()])
  });

  ngOnInit(){ 
    if(this.role=='ROLE_NURSE'){
      this.nextButton = 'Save';
    }
    if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){
      this.disable = true;
    }   
    this.initialLoad();
  }

  initialLoad(){
    this.visitId = this.dataSharingService.getVisitId();
    this.clearDiagnosisForm();
    if(this.visitId!=null && this.visitId!=undefined){
      this.isDataPresentAlready = false;
      this.visitService.getPatientDiagnosisData(this.visitId).subscribe({
        next:(result:ApiResponse)=>{
          this.drawFormContent(result.responseData);

          if(this.disable){
            this.diagnosisFormGroup.get('diagnosisForm').disable();            
          }
        }
      })
    } 
    
  }

  drawFormContent(data:any){
   let diagnosisData:DiagnosisData;

   for(let i=0;i<data.length;i++){
    diagnosisData = data[i].diagnosisMaster;

     if(i>0){
      this.addDiagnosis();
     }    
     this.diagnosisForm.at(i).get('diagnosisCode')?.setValue(diagnosisData.diagnosisCode);

     if(diagnosisData.diagnosisCode.toUpperCase()=="OTHERS"){
      this.diagnosisForm.at(i).get('diagnosisDescription')?.setValue(data[i].otherDiagnosisIfAny);
     }else{
      this.diagnosisForm.at(i).get('diagnosisDescription')?.setValue(diagnosisData.diagnosisDescription);    
     } 
   }
   //this.diagnosisForm.disable();
  }

  pushDiagnosisData(filterValue:string,filterBy:string){
    this.diagnosisCodeOptions = [];
    this.diagnosisDescripionOptions = [];
    this.diagnosisData.filter(
      data=>{      
       this.diagnosisCodeOptions.push(data.diagnosisCode);
       this.diagnosisDescripionOptions.push(data.diagnosisDescription);
      }
    );
    if(filterBy=='diagnosisCode'){
      this.diagnosisCodefilteredOptions = this.diagnosisCodeOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      );
    }else{
      this.diagnosisDescriptionfilteredOptions = this.diagnosisDescripionOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      ); 
    }
  }

  search(filterValue: string,filterBy:string){    
    if(filterValue.length>2){
      let searchTextObj:SearchContent = {
        "searchText": filterValue.trim()
      }
      this.visitService.getDiagnosisData(searchTextObj,filterBy).subscribe({
        next:result =>{
          this.diagnosisData = result?.responseData;
          this.pushDiagnosisData(filterValue,filterBy);
        }
      });    
    }    
  }

  filter(filterValue: string,filterBy:string){
      let isValueNotExistInDOM;

      if(filterBy=='diagnosisCode'){
        isValueNotExistInDOM = this.diagnosisCodeOptions.filter(option => option.toLowerCase().includes(filterValue.toLowerCase())).length==0;
      }else{
        isValueNotExistInDOM = this.diagnosisDescripionOptions.filter(option => option.toLowerCase().includes(filterValue.toLowerCase())).length==0;
      }

      if(filterValue.length>2 && isValueNotExistInDOM){
        this.search(filterValue,filterBy);
      }else{
        if(filterBy=='diagnosisCode'){
          this.diagnosisCodefilteredOptions = this.diagnosisCodeOptions.filter(
            option => option.toLowerCase().includes(filterValue.toLowerCase())
          );
        }else{
          this.diagnosisDescriptionfilteredOptions = this.diagnosisDescripionOptions.filter(
            option => option.toLowerCase().includes(filterValue.toLowerCase())
          );
        }        
      }
  }

  selectDiagnosisCode(value:any,index:number){
    for(let i=0;i<this.diagnosisData.length;i++){
      if(this.diagnosisData[i].diagnosisCode == value){
        this.diagnosisForm.at(index).get('diagnosisDescription')?.setValue(this.diagnosisData[i].diagnosisDescription);    
        break;
      }
    }
  }

  selectDiagnosisDescription(value:any,index:number){
    for(let i=0;i<this.diagnosisData.length;i++){
      if(this.diagnosisData[i].diagnosisDescription == value){
        this.diagnosisForm.at(index).get('diagnosisCode')?.setValue(this.diagnosisData[i].diagnosisCode);        
        break;
      }
    }    
  }

  saveOrUpdateDiagnosisForm(){

    if(!this.isDataPresentAlready ||  this.diagnosisFormGroup.dirty){
        let patientDiagnosisInfoList:PatientDiagnosisInfo[] =[];
        let patientDiagnosisInfo:PatientDiagnosisInfo; 

        for(let i=0; i<this.diagnosisForm.length; i++){
        
          let currentDiagnosisCode:string = this.diagnosisForm.at(i).get('diagnosisCode')?.value;
         
          patientDiagnosisInfo = {
            visitId:this.visitId,
            diagnosisCode:currentDiagnosisCode,
            otherDiagnosisIfAny:(currentDiagnosisCode.toUpperCase() =="OTHERS")?this.diagnosisForm.at(i).get('diagnosisDescription')?.value:"",
            isDeprecated:this.diagnosisForm.at(i).get('isDeprecated')?.value==1?true:false
          }

          patientDiagnosisInfoList.push(patientDiagnosisInfo);
        }
        
        this.visitService.saveOrUpdatePatientDiagnosisData(patientDiagnosisInfoList).subscribe({
          next:(result:ApiResponse)=>{
            console.log(result);
            if(result.statusCode==200){
              if(this.role=='ROLE_NURSE'){
                this.snackBar.open('Diagnosis data saved','Success',{
                  duration: 5000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                });
              }else{
                this.moveNext();
              }
             
            }else{
              alert();
            }
          }
        })
    }else{
      this.moveNext();
    }
  }

  get diagnosisForm():FormArray{
    return <FormArray>this.diagnosisFormGroup.get('diagnosisForm');
  }

  clearDiagnosisForm():void{
   this.diagnosisForm.clear({emitEvent: false});
   this.addDiagnosis();
  }
  
  buildDiagnosis():FormGroup{ 
    return this.formBuilder.group({
      diagnosisCode:new FormControl("",[Validators.required]),
      diagnosisDescription:new FormControl("",[Validators.required]),
      isDeprecated:new FormControl(0,[Validators.required]),
    });
  }

  addDiagnosis(){
    this.diagnosisForm.push(this.buildDiagnosis());
  }

  deleteDiagnosis(i:number){
    this.diagnosisForm.removeAt(i);
  }

  moveNextOnclick(){
    console.log(this.diagnosisForm.value)
    if(this.diagnosisFormGroup.valid){
      this.saveOrUpdateDiagnosisForm();
    }else{
      this.diagnosisFormGroup.markAllAsTouched();
    }   
    if(this.disable){
      this.moveNext();
    } 
  }

  movePrevious(){    
    this.stepper?.previous();
  }

  moveNext(){
     if(this.nextComponent!=undefined && this.nextComponent!=null){
       this.nextComponent.initialLoad();
     }
    this.stepper?.next();
  }


}
