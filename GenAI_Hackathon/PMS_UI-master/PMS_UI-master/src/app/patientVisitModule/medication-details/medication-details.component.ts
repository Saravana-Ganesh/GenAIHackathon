import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse, SearchContent } from '../models/api-model';
import { MedicationData, PatientMedicationInfo } from '../models/data-model';
import { DataSharingService } from '../services/data-sharing-service/data-sharing.service';
import { VisitService } from '../services/visit.service';


@Component({
  selector: 'medication-details',
  templateUrl: './medication-details.component.html',
  styleUrls: ['./medication-details.component.css']
})
export class MedicationDetailsComponent implements OnInit {
  medicationCodeFilteredOptions:string[] = [];
  medicationCodeOptions:string[] = [];
  drugNameFilteredOptions:string[] = [];
  drugBrandNameFilteredOptions:string[] =[];
  drugFormFilteredOptions:string[] = [];
  drugNameOptions:string[] = [];
  medicationData!:MedicationData[];
  optionFilterMedicationData!:MedicationData[];
  private visitId!:any;
  public disable:boolean = false;


 
  displayedColumns: string[] = ['drugId', 'drugName','drugGenericName','drugBrandName','drugForm'];
  dataSource!: MatTableDataSource<MedicationData>;
  medicationTableData:MedicationData[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  
  @Input() stepper!:MatStepper;
  
  constructor(
      private formBuilder: FormBuilder,
      private visitService:VisitService,
      private dataSharingService:DataSharingService,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){
      this.disable = true;
    }   
    this.visitId = this.dataSharingService.getVisitId();
    this.initialLoad();
  }

  initialLoad(){
    if(this.visitId!=null && this.visitId!=undefined){
      this.visitService.getPatientMedicationData(this.visitId).subscribe({
        next:(result)=>{
          if(result.statusCode==200){
            this.drawTable(result.responseData);
          }
        }
      });
    }
  }
  drawTable(medication:MedicationData[]){
    this.medicationTableData = medication;
    console.log('--------------------')
    console.log(medication);
      this.dataSource = new MatTableDataSource(this.medicationTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  medicationFormGroup :FormGroup = this.formBuilder.group({
    medicationForm : this.formBuilder.array([this.buildMedication()])
  });

  pushMedicationData(filterValue:string,filterBy:string){
    this.medicationCodeFilteredOptions = [];
    this.medicationCodeOptions = [];
    this.drugNameOptions = [];

    this.medicationData.map(
      data=>{
          this.medicationCodeOptions.push(data.drugId)
          this.drugNameOptions.push(data.drugName);
      }
    );

    if(filterBy=='medicationCode'){
      this.medicationCodeFilteredOptions = this.medicationCodeOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())
      );
    }else if(filterBy=='drugName'){
      this.drugNameFilteredOptions = this.drugNameOptions.filter(
        option => option.toLowerCase().includes(filterValue.toLowerCase())                 
      );
      this.drugNameFilteredOptions=  this.drugNameFilteredOptions.filter((v, i, a) => a.indexOf(v) === i);
    }
  }

  search(filterValue: string, filterBy: string) {
    if(filterValue.length>2){
      let searchTextObj:SearchContent = {
        "searchText": filterValue.trim()
      }
      this.visitService.getMedicationData(searchTextObj,filterBy).subscribe({
        next:(result:ApiResponse)=>{
            this.medicationData = result.responseData;
            this.pushMedicationData(filterValue,filterBy);
        }
      })
    }
  }

  filter(filterValue:string,filterBy:string){
    if(filterValue.length>2){

      if(filterBy=='medicationCode'){
        this.medicationCodeFilteredOptions = this.medicationCodeOptions.filter(option => option.toLowerCase()==filterValue.toLowerCase());
        
        if(this.medicationCodeFilteredOptions.length==0){
          this.search(filterValue,filterBy);
        }
      }else if(filterBy == 'drugName'){
        this.drugNameFilteredOptions = this.drugNameOptions.filter(option => option.toLowerCase()==filterValue.toLowerCase());

        if(this.drugNameFilteredOptions.length==0){
          this.search(filterValue,filterBy);
        }else{       
          this.drugNameFilteredOptions=  this.drugNameFilteredOptions.filter((v, i, a) => a.indexOf(v) === i);
        }
      }
    }
   
  }
  
  selectMedicationCode(value:any,index:number){    

    this.drugBrandNameFilteredOptions = this.drugNameOptions = this.drugFormFilteredOptions = []; 

    for(let i=0;i<this.medicationData.length;i++){

      if(value==this.medicationData[i].drugId){
        this.medicationForm.at(index).get('drugName')?.setValue(this.medicationData[i].drugName);
        this.medicationForm.at(index).get('drugBrandName')?.setValue(this.medicationData[i].drugBrandName);
        this.medicationForm.at(index).get('drugForm')?.setValue(this.medicationData[i].drugForm);
        this.medicationForm.at(index).get('drugGenericName')?.setValue(this.medicationData[i].drugGenericName);
        break;
      }

    }

  }
  selectDrugName(value:any,index:number){
    this.drugBrandNameFilteredOptions = [];
    this.drugFormFilteredOptions = [];
    this.medicationCodeFilteredOptions = [];
    this.optionFilterMedicationData =[];
    this.drugNameFilteredOptions =[];

    for(let i=0;i<this.medicationData.length;i++){     

      if(value==this.medicationData[i].drugName){
          this.optionFilterMedicationData.push(this.medicationData[i]);
          //setting drug code options
           this.medicationCodeFilteredOptions.push(this.medicationData[i].drugId)
         //setting drug brand name options
          this.drugBrandNameFilteredOptions.push(this.medicationData[i].drugBrandName);
          //setting drug from filterd options
         // this.drugFormFilteredOptions.push(this.medicationData[i].drugForm);          
      }     
    }
     //setting generic drug name
    this.medicationForm.at(index).get('drugGenericName')?.setValue(this.optionFilterMedicationData[0].drugGenericName);
    this.medicationForm.at(index).get('medicationCode')?.setValue('');
    this.medicationForm.at(index).get('drugBrandName')?.setValue('');
    this.medicationForm.at(index).get('drugForm')?.setValue('');
    this.drugBrandNameFilteredOptions=  this.drugBrandNameFilteredOptions.filter((v, i, a) => a.indexOf(v) === i);
    this.drugFormFilteredOptions=  this.drugFormFilteredOptions.filter((v, i, a) => a.indexOf(v) === i);
  }

  selectDrugBrandName(value:any,index:number){
    this.drugFormFilteredOptions = [];
    this.medicationCodeFilteredOptions = [];
    let tempMedicationData:MedicationData[] = this.optionFilterMedicationData;
    this.optionFilterMedicationData = [];

    for(let i=0;i<tempMedicationData.length;i++){
        if(value==tempMedicationData[i].drugBrandName){
          this.drugFormFilteredOptions.push(tempMedicationData[i].drugForm);
          this.medicationCodeFilteredOptions.push(tempMedicationData[i].drugId);   
          this.optionFilterMedicationData.push(tempMedicationData[i]);      
        }
    }
    this.medicationForm.at(index).get('drugForm')?.setValue('');

    if(!(this.medicationCodeFilteredOptions.indexOf(this.medicationForm.at(index).get('drugId')?.value) >-1)){
      this.medicationForm.at(index).get('drugId')?.setValue('');
    }
  
    if(this.drugFormFilteredOptions.length==1){
      console.log(this.drugFormFilteredOptions)
      //this.medicationForm.at(index).get('drugForm')?.setValue(this.drugFormFilteredOptions[0]);
    }
    this.drugBrandNameFilteredOptions = [];
  
  }

  selectDrugForm(value:any,index:number){
    this.medicationCodeFilteredOptions = [];

    for(let i=0;i<this.optionFilterMedicationData.length;i++){
      if(value==this.optionFilterMedicationData[i].drugForm){
        this.medicationCodeFilteredOptions.push(this.optionFilterMedicationData[i].drugId);
      }
    }
   
    if(this.medicationCodeFilteredOptions.length==1){
      this.medicationForm.at(index).get('medicationCode')?.setValue(this.medicationCodeFilteredOptions[0]);
    }else{
      this.medicationForm.at(index).get('medicationCode')?.setValue('');
    }
    
  }

  get medicationForm():FormArray{
    return <FormArray>this.medicationFormGroup.get('medicationForm');
  }

  
  buildMedication():FormGroup{ 
    return this.formBuilder.group({
      medicationCode: new FormControl("",[Validators.required]),
      drugName: new FormControl("",[Validators.required]),
      drugGenericName: new FormControl("",[Validators.required]),
      drugBrandName: new FormControl("",[Validators.required]),
      drugForm: new FormControl("",[Validators.required]),
      isDeprecated:new FormControl(0),
    });
  }

  addMedication(currentArrayIndex:number){
    if(this.medicationForm.at(currentArrayIndex).valid){     
      //this.medicationForm.push(this.buildMedication());
      this.saveMedicationDataInTable(currentArrayIndex);
    }else{
      this.snackBar.open(`Can't able to generate`,'Fill current form before adding new one',{duration: 5000})
    }
  }

  saveMedicationDataInTable(currentArrayIndex:number){
    let medicationData:MedicationData = {
      drugId:"",
      drugBrandName:"",
      drugForm:"",
      drugName:"",
      drugGenericName:"",
      drugStrength:""
    }
    medicationData.drugId = this.medicationForm.at(0).get('medicationCode')?.value;
    medicationData.drugBrandName = this.medicationForm.at(0).get('drugBrandName')?.value;
    medicationData.drugName  = this.medicationForm.at(0).get('drugName')?.value;
    medicationData.drugGenericName  = this.medicationForm.at(0).get('drugGenericName')?.value;
    medicationData.drugForm  = this.medicationForm.at(0).get('drugForm')?.value;
    console.log(medicationData);

    let i=0;
    for(;i<this.medicationTableData.length;i++){
      if(this.medicationTableData[i].drugId==medicationData.drugId){
        this.snackBar.open('Medication already added','Add new one',{duration: 5000})
        break;
      }
    }
    if(i==this.medicationTableData.length){
      this.medicationTableData.push(medicationData);
      this.dataSource = new MatTableDataSource(this.medicationTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.medicationForm.at(currentArrayIndex).reset();
    }   
  }
  applyTableFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteMedication(i:number){
    this.medicationForm.removeAt(i);
  }
  
  moveNext(){
    if(this.medicationTableData.length>0){
      this.saveMedicationData();     
    }else{
      this.medicationFormGroup.markAllAsTouched();
    }
   
  }

  saveMedicationData(){
    let patientMedicationInfoList:PatientMedicationInfo[] =[];
	  let patientMedicationInfo:PatientMedicationInfo; 
    
    for(let i=0; i<this.medicationTableData.length; i++){
      let medicationCode = this.medicationTableData[i].drugId;
      patientMedicationInfo = {
        visitId:this.dataSharingService.getVisitId(),
        drugId:medicationCode,
      }
      patientMedicationInfoList.push(patientMedicationInfo);
    }

    this.visitService.savePatientMedicationData(patientMedicationInfoList,this.dataSharingService.getPatientDetail().meetingId).subscribe({
      next:(result:ApiResponse)=>{
        if(result.statusCode==200){
          alert('Data Saved Sucessfully');
          this.stepper?.next();
        }else{
          alert('Error occured')
        }
      }
    })
  }

}
