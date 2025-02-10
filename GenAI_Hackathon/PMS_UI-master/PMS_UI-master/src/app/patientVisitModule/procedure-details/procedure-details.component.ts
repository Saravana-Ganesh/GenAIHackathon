import { Component,Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ApiResponse, SearchContent } from '../models/api-model';
import { PatientProcedureInfo, ProcedureData } from '../models/data-model';
import { DataSharingService } from '../services/data-sharing-service/data-sharing.service';
import { VisitService } from '../services/visit.service';

@Component({
  selector: 'procedure-input-form',
  templateUrl: './procedure-details.component.html',
  styleUrls: ['./procedure-details.component.css'],
})

export class ProcedureDetailsComponent implements OnInit{
 
  
  constructor(
    private formBuilder: FormBuilder,
    private visitService:VisitService,
    private dataSharingService:DataSharingService) { }

  @Input()stepper!:MatStepper;
  
  procedureFormGroup:FormGroup = this.formBuilder.group({
    procedureForm : this.formBuilder.array([this.buildProcedure()])
    
  });
  
  private isDataPresentAlready = false;
  private visitId!:any;
  public disable = false;

  procedureCodefilteredOptions!:string[];
  procedureDescriptionfilteredOptions!:string[];
  procedureCodeOptions: string[] = [];
  procedureDescripionOptions:string[] = [];
  procedureData!: ProcedureData[];


  ngOnInit(): void {
    if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){
      this.disable = true;
    } 
    this.initialLoad();
  }

  initialLoad(){
    this.visitId = this.dataSharingService.getVisitId();
    this.clearProcedureForm();
    if(this.visitId!=null && this.visitId!=undefined){
      this.isDataPresentAlready = false;
      this.visitService.getPatientProcedureData(this.visitId).subscribe({
        next:(result:ApiResponse)=>{
          this.drawFormContent(result.responseData);
          if(this.disable){
            this.procedureFormGroup.disable();
          } 
        }
      })
    }
       
  }

  drawFormContent(data:any){
    let procedureData:ProcedureData;
 
    for(let i=0;i<data.length;i++){
     procedureData = data[i].procedureMaster;
 
      if(i>0){
       this.addProcedure();
      }    
      this.procedureForm.at(i).get('procedureCode')?.setValue(procedureData.procedureCode);
 
      if(procedureData.procedureCode.toUpperCase()=="OTHERS"){
       this.procedureForm.at(i).get('procedureDescription')?.setValue(data[i].otherProcedureIfAny);
      }else{
       this.procedureForm.at(i).get('procedureDescription')?.setValue(procedureData.procedureDescription);    
      } 
    }
   }

   clearProcedureForm():void{
    this.procedureForm.clear({emitEvent: false});
    this.addProcedure();
   }

  pushProcedureData(filterValue:string,filterBy:string){
    this.procedureCodeOptions = [];
    this.procedureDescripionOptions = [];
    this.procedureData.filter(
      data=>{      
       this.procedureCodeOptions.push(data.procedureCode);
       this.procedureDescripionOptions.push(data.procedureDescription);
      }
    );
    if(filterBy=='procedureCode'){
      this.procedureCodefilteredOptions = this.procedureCodeOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      );
    }else{
      this.procedureDescriptionfilteredOptions = this.procedureDescripionOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      ); 
    }
    console.log(this.procedureCodefilteredOptions);
  }

  search(filterValue: string,filterBy:string){    
    if(filterValue.length>2){
      let searchTextObj:SearchContent = {
        "searchText": filterValue.trim()
      }
      this.visitService.getProcedureData(searchTextObj,filterBy).subscribe({
        next:result =>{
          this.procedureData = result?.responseData;
          this.pushProcedureData(filterValue,filterBy);
        }
      });    
    }    
  }

  filter(filterValue: string,filterBy:string){
    
    let isValueNotExistInDOM;
    if(filterBy=='procedureCode'){
      isValueNotExistInDOM = this.procedureCodeOptions.filter(option => option.toLowerCase().includes(filterValue.toLowerCase())).length==0;
    }else{
      isValueNotExistInDOM = this.procedureDescripionOptions.filter(option => option.toLowerCase().includes(filterValue.toLowerCase())).length==0;
    }

    if(filterValue.length>2 && isValueNotExistInDOM){
      this.search(filterValue,filterBy);
    }else{
      this.procedureCodefilteredOptions = this.procedureCodeOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }

  selectProcedureCode(value:any,index:number){
    for(let i=0;i<this.procedureData.length;i++){
      if(this.procedureData[i].procedureCode == value){
        this.procedureForm.at(index).get('procedureDescription')?.setValue(this.procedureData[i].procedureDescription);
        break;
      }
    }
  }
  selectProcedureDescription(value:any,index:number){
    for(let i=0;i<this.procedureData.length;i++){
      if(this.procedureData[i].procedureDescription == value){
        this.procedureForm.at(index).get('procedureCode')?.setValue(this.procedureData[i].procedureCode);
        break;
      }
    }
  }

  get  procedureForm():FormArray{
    return <FormArray>this.procedureFormGroup.get('procedureForm');
  }

  buildProcedure():FormGroup{
    return this.formBuilder.group({
      procedureCode:new FormControl("", Validators.required),
      procedureDescription:new FormControl("", Validators.required),
      isDeprecatedProcedure:new FormControl(0, Validators.required),
    });   
  }

  addProcedure(){
    this.procedureForm.push(this.buildProcedure());
  }

  deleteProcedure(i:number){
    this.procedureForm.removeAt(i);
  }

  moveNextOnclick(){
    console.log(this.procedureForm.value)
    if(this.procedureFormGroup.valid){
      this.saveOrUpdateProcedureForm();
    }else{
      this.procedureFormGroup.markAllAsTouched();
    }   
    if(this.disable){
      this.moveNext();
    }  
  }

  saveOrUpdateProcedureForm(){
      if(!this.isDataPresentAlready ||  this.procedureFormGroup.dirty){
        let patientProcedureInfoList:PatientProcedureInfo[] =[];
        let patientProcedureInfo:PatientProcedureInfo; 

        for(let i=0; i<this.procedureForm.length; i++){
        
          let currentProcedureCode:string = this.procedureForm.at(i).get('procedureCode')?.value;
        
          patientProcedureInfo = {
            visitId:this.visitId,
            procedureCode:currentProcedureCode,
            ifOtherProcedure:(currentProcedureCode.toUpperCase() =="OTHERS")?this.procedureForm.at(i).get('procedureDescription')?.value:"",
            isDeprecated:this.procedureForm.at(i).get('isDeprecated')?.value==1?true:false
          }

          patientProcedureInfoList.push(patientProcedureInfo);
        }
        
        this.visitService.saveOrUpdatePatientProcedureData(patientProcedureInfoList).subscribe({
          next:(result:ApiResponse)=>{
            console.log(result);
            if(result.statusCode==200){
              this.moveNext();
            }else{
              alert();
            }
          }
        });
    }else{
      this.moveNext();
    }
  }

  public moveNext(){
    // if(this.nextComponent!=undefined && this.nextComponent!=null){
    //   this.nextComponent.initialLoad();
    // }
   this.stepper?.next();
  }

}
