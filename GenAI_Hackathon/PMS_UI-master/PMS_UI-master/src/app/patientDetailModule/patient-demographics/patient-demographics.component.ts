import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Patient } from '../model/patient';
import { PatientModuleService } from '../services/patient-module.service';
import { MatTableDataSource } from '@angular/material/table';
import { createUnparsedSourceFile } from 'typescript';
import { MatStepper } from '@angular/material/stepper';
import { AllergyData, DemographicData, EmergencyContactData, PatientAndDemographicData, PatientData, PatientDemographicReport, RelationshipData } from '../model/data-models';



@Component({
  selector: 'app-patient-demographics',
  templateUrl: './patient-demographics.component.html',
  styleUrls: ['./patient-demographics.component.css']
})
export class PatientDemographicsComponent implements OnInit {
  private routeSub: Subscription = new Subscription;

  constructor(private patientModuleService: PatientModuleService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  displayedColumns: string[] = ['allergyId', 'allergyName', 'allergyType', 'allergyDesc', 'allergyFatalOption', 'AllergyAction'];
  dataSource!: MatTableDataSource<any>;




  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('stepper') emergencyStepper!: MatStepper;

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params => {
      this.getPatientById(params['id']);
    });

    this.loadAllergyData();
    this.initForm();
    this.getAllRelationships();
  }
  patientid!: number;
  demographicId!: number;
  emergencyId!: number;
  relationshipId!: number;
  relationshipName!: string;
  responeAllergyId!: number;

  titleCtrl!: string;
  firstNameCtrl!: string;
  lastNameCtrl: string | undefined;
  dobCtrl!: string;
  genderCtrl!: string;
  raceCtrl!: string;
  ethinicityCtrl!: string;
  languageCtrl!: string;
  emailCtrl!: string;
  addressCtrl!: string;
  conatctCtrl!: string;

  buttonAddUpdate: boolean = true;

  emergencyFirstNameCtrl!: string;
  emergencyLastNameCtrl!: string;
  emergencyEmailIdCtrl!: string;
  emergencyContactNoCtrl!: string;
  emergencyAddressCtrl!: string;
  emergencyPortalAccessCtrl!: string;
  patientAllergieCtrl: string = 'Yes';
  allergyDescriptionCtrl!: string;
  allergyClinicalCtrl!: string;
  allergyFatelCtrl: string='No';
  checked = false;

  relationship: any[] = [];
  allergyCodeOptions: string[] = [];
  allergyTypeOptions: string[] = [];
  allergyNameOptions: string[] = [];

  allergyCodeFilterOptions: String[] = [];
  allergyTypeFilterOptions: String[] = [];
  allergyNameFilterOptions: String[] = [];

  tableRecordId!: any;
  patientDetailReport:any[]=[];
  patientDemographicReport:any[]=[];
  patientEmergencyReport:any[]=[];
  patientAllergyReport:any[]=[];

  demographicFormGroup: FormGroup = new FormGroup({
    titleCtrl: new FormControl('', Validators.required),
    firstNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,20}")]),
    lastNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,20}")]),
    dobCtrl: new FormControl('', [Validators.required]),
    genderCtrl: new FormControl('', Validators.required),
    raceCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,50}")]),
    ethinicityCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,50}")]),
    languageCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,50}")]),
    emailCtrl: new FormControl('', [Validators.required, Validators.email]),
    addressCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\s]{4,50}")]),
    conatctCtrl: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}")])
  });



  emergencyFormGroup: FormGroup = new FormGroup({
    emergencyFirstNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,20}")]),
    emergencyLastNameCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{3,20}")]),
    emergencyRelationCtrl: new FormControl('', Validators.required),
    emergencyEmailIdCtrl: new FormControl('', [Validators.required, Validators.email]),
    emergencyContactNoCtrl: new FormControl('', Validators.required),
    emergencyAddressCtrl: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z\s]{4,50}")]),
    emergencyPortalAccessCtrl: new FormControl('', Validators.required),

  });


  allergyFormGroup: FormGroup = new FormGroup({
    patientAllergieCtrl: new FormControl('Yes'),
    emergencyAllergyIdCtrl: new FormControl(''),
    emergencyAllergyTypeCtrl: new FormControl(''),
    emergencyAllergyNameCtrl: new FormControl(''),
    allergyDescriptionCtrl: new FormControl(''),
    allergyClinicalCtrl: new FormControl(''),
    allergyFatelCtrl: new FormControl('')
  });

  loadAllergyData() {
    this.patientModuleService.getAllAllergy().subscribe(response => {
      console.log("All allergies code reponse:" + JSON.stringify(response));
      for (let i = 0; i < response.length; i++) {
        this.allergyCodeOptions.push(response[i].allergyCode);
        this.allergyCodeFilterOptions.push(response[i].allergyCode);
        this.allergyNameOptions.push(response[i].allergyName);
        this.allergyNameFilterOptions.push(response[i].allergyName);
        this.allergyTypeOptions.push(response[i].allergyType);
        this.allergyTypeFilterOptions.push(response[i].allergyType);
      }
    })
  }

  initForm() {
    this.allergyFormGroup.get('emergencyAllergyIdCtrl').valueChanges.subscribe(response => {
      this.filterAllergyCodeData(response);
    })

    this.allergyFormGroup.get('emergencyAllergyTypeCtrl').valueChanges.subscribe(response => {
      this.filterAllergyTypeData(response);
    })

    this.allergyFormGroup.get('emergencyAllergyNameCtrl').valueChanges.subscribe(response => {
      this.filterAllergyNameData(response);
    })

  }

  filterAllergyCodeData(eneteredData: any) {
    this.allergyCodeFilterOptions = this.allergyCodeOptions.filter(
      item => {
        return item.toLowerCase().indexOf(eneteredData.toLowerCase()) > -1
      })
  }

  filterAllergyTypeData(eneteredData: any) {
    this.allergyTypeFilterOptions = this.allergyTypeOptions.filter(
      item => {
        return item.toLowerCase().indexOf(eneteredData.toLowerCase()) > -1
      })
  }

  filterAllergyNameData(eneteredData: any) {
    this.allergyNameFilterOptions = this.allergyNameOptions.filter(
      item => {
        return item.toLowerCase().indexOf(eneteredData.toLowerCase()) > -1
      })
  }


  selectAllergyCode(value: String) {
    console.log("inside selectAllergyCode");
    this.patientModuleService.getAllergyCodes(value).subscribe(response => {
      console.log("selectAllergyCode: response:" + JSON.stringify(response[0].allergyCode));
      this.responeAllergyId = response[0].allergyId;
      this.allergyFormGroup.controls['emergencyAllergyNameCtrl'].setValue(response[0].allergyName);
      this.allergyFormGroup.controls['emergencyAllergyTypeCtrl'].setValue(response[0].allergyType);
    })

  }

  selectAllergyName(value: String) {
    console.log("inside selectAllergyName");
    this.patientModuleService.getAllergyNames(value).subscribe(response => {
      console.log("selectAllergyName: response:" + JSON.stringify(response[0].allergyName));
      this.responeAllergyId = response[0].allergyId;
      this.allergyFormGroup.controls['emergencyAllergyIdCtrl'].setValue(response[0].allergyCode);
      this.allergyFormGroup.controls['emergencyAllergyTypeCtrl'].setValue(response[0].allergyType);
    })

  }

  selectAllergyType(value: String) {
    console.log("inside selectAllergyType");
    this.patientModuleService.getAllergyTypes(value).subscribe(response => {
      console.log("selectAllergyType: response:" + JSON.stringify(response[0].allergyType));
      this.responeAllergyId = response[0].allergyId;
      this.allergyFormGroup.controls['emergencyAllergyIdCtrl'].setValue(response[0].allergyCode);
      this.allergyFormGroup.controls['emergencyAllergyNameCtrl'].setValue(response[0].allergyName);;
    })

  }

  getPatientById(id: number) {
    this.patientModuleService.getPatientById(id).subscribe(data => {
      console.log("response data: " + JSON.stringify(data));
      this.patientid = data.patientId;
      console.log("DemoGraphic fetch Id:" + this.demographicId);
      this.demographicFormGroup.controls['titleCtrl'].setValue(data.title);
      this.demographicFormGroup.controls['firstNameCtrl'].setValue(data.firstName);
      this.demographicFormGroup.controls['lastNameCtrl'].setValue(data.lastName);
      this.demographicFormGroup.controls['dobCtrl'].setValue(data.dateOfBirth);
      this.demographicFormGroup.controls['emailCtrl'].setValue(data.emailId);
      this.demographicFormGroup.controls['conatctCtrl'].setValue(data.phoneNumber);
    

    })

    this.patientModuleService.getPatientDemographicById(id).subscribe(data => {
      this.demographicId = data.demographicId;
      this.demographicFormGroup.controls['genderCtrl'].setValue(data.gender);
      this.demographicFormGroup.controls['raceCtrl'].setValue(data.race);
      this.demographicFormGroup.controls['ethinicityCtrl'].setValue(data.ethnicity);
      this.demographicFormGroup.controls['languageCtrl'].setValue(data.languages);
      this.demographicFormGroup.controls['addressCtrl'].setValue(data.address);

    })

  }

  getAllRelationships() {
    this.patientModuleService.getAllRelations().subscribe(data => {
      this.relationship = data;
    })
  }

  onCheckboxChange(event: MatCheckboxChange) {
    if (event.checked) {
      this.emergencyFormGroup.controls['emergencyAddressCtrl'].setValue(this.addressCtrl);
    } else {
      this.emergencyFormGroup.controls['emergencyAddressCtrl'].setValue('');
    }
  }

  savePatientDemographicDetails() {
    if(this.demographicFormGroup.valid){
    let patientData: PatientData = {
      patientId: this.patientid,
      title: this.demographicFormGroup.value.titleCtrl,
      firstName: this.demographicFormGroup.value.firstNameCtrl,
      lastName: this.demographicFormGroup.value.lastNameCtrl,
      emailId: this.demographicFormGroup.value.emailCtrl,
      dateOfBirth: this.demographicFormGroup.value.dobCtrl,
      phoneNumber: this.demographicFormGroup.value.conatctCtrl,
      countryCode: '91'
    }
    console.log("savePatientDemographicDetails : languageCtrl" + this.demographicFormGroup.value.languageCtrl);
    console.log("savePatientDemographicDetails : gender" + this.demographicFormGroup.value.genderCtrl);
    let demographicData: DemographicData = {
      demographicId: this.demographicId,
      race: this.demographicFormGroup.value.raceCtrl,
      ethnicity: this.demographicFormGroup.value.ethinicityCtrl,
      languages: this.demographicFormGroup.value.languageCtrl,
      address: this.demographicFormGroup.value.addressCtrl,
      gender: this.demographicFormGroup.value.genderCtrl
    }
    let data: PatientAndDemographicData = {
      patientUserEntity: patientData,
      patientDemogrphicEntity: demographicData
    }
    this.patientModuleService.savePatientDemographic(data).subscribe({
      next: data => {
        console.log(data);
      }
    })

    this.stepper.next();

    this.getEmergencyFormDetails();
  }
  }

  getEmergencyFormDetails() {
    this.patientModuleService.getEmergencyDetailsById(this.patientid).subscribe(response => {
      console.log("getEmergencyFormDetails: Relations" + response.relationShipEntity.relation);
      this.emergencyId = response.emergencyId;
      this.relationshipId = response.relationShipEntity.id;
      this.relationshipName = response.relationShipEntity.relation;
      this.emergencyFormGroup.controls['emergencyFirstNameCtrl'].setValue(response.emergencyFirstName);
      this.emergencyFormGroup.controls['emergencyLastNameCtrl'].setValue(response.emergencyLastName);
      this.emergencyFormGroup.controls['emergencyRelationCtrl'].setValue(response.relationShipEntity.id);
      this.emergencyFormGroup.controls['emergencyEmailIdCtrl'].setValue(response.emergencyEmail);
      this.emergencyFormGroup.controls['emergencyContactNoCtrl'].setValue(response.emergencyContactNo);
      this.emergencyFormGroup.controls['emergencyAddressCtrl'].setValue(response.emergencyAddress);
      this.emergencyFormGroup.controls['emergencyPortalAccessCtrl'].setValue(response.emergencyAccessToPortal);
    })
  }

  savePatientEmergencyDetails() {
    if(this.emergencyFormGroup.valid){
      console.log("savePatientEmergencyDetails: Id:" + this.relationshipId);
    console.log("savePatientEmergencyDetails: Name:" + this.relationshipName);
    let relationshipFormData: RelationshipData = {
      id: this.relationshipId,
      relation: this.relationshipName
    }
    let emergencyContactData: EmergencyContactData = {
      patientId: this.patientid,
      emergencyId: this.emergencyId,
      emergencyFirstName: this.emergencyFormGroup.value.emergencyFirstNameCtrl,
      emergencyLastName: this.emergencyFormGroup.value.emergencyLastNameCtrl,
      emergencyEmail: this.emergencyFormGroup.value.emergencyEmailIdCtrl,
      emergencyCountryCode: '91',
      emergencyContactNo: this.emergencyFormGroup.value.emergencyContactNoCtrl,
      emergencyAddress: this.emergencyFormGroup.value.emergencyAddressCtrl,
      emergencyAccessToPortal: this.emergencyFormGroup.value.emergencyPortalAccessCtrl,
      relationShipEntity: relationshipFormData
    }


    this.patientModuleService.saveEmergencyDetails(emergencyContactData).subscribe({
      next: data => {
        console.log(data);
      }
    })

    this.emergencyStepper.next();

    this.getAllergiesByPatientId();
    }
    
  }

  getAllergiesByPatientId() {
    this.patientModuleService.getAllergiesByPatientId(this.patientid).subscribe({
      next: data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
      }
    })


  }
  onRelationshipChange(eventValue: any) {
    console.log("onRelationshipChange: this.relationshipName="+eventValue.source.triggerValue);
    console.log("onRelationshipChange: this.relationshipId="+eventValue.value);
    this.relationshipId = eventValue.value;
    this.relationshipName = eventValue.source.triggerValue;
  }



  refreshDataSource() {
    this.dataSource._updateChangeSubscription();
  }

  addAllergy() {

    let AllergyFormData: AllergyData = {
      patientId: this.patientid,
      allergyId: this.responeAllergyId,
      allergyName: this.allergyFormGroup.get('emergencyAllergyNameCtrl').value,
      allergyType: this.allergyFormGroup.get('emergencyAllergyTypeCtrl').value,
      allergyFatal: this.allergyFormGroup.get('allergyFatelCtrl').value,
      allergyDesc: this.allergyFormGroup.get('allergyDescriptionCtrl').value,
      allergyClinicInfo: this.allergyFormGroup.get('allergyClinicalCtrl').value,
      allergyCode: this.allergyFormGroup.get('emergencyAllergyIdCtrl').value
    }

    let newAllergy = this.dataSource.data;

    let currentAllergyCode = this.allergyFormGroup.get('emergencyAllergyIdCtrl').value;

    if (this.dataSource.data.some(value => value.allergyCode === currentAllergyCode)) {
      alert("Allergy Already present againt patient");

    } else {

      this.patientModuleService.saveAllergyById(AllergyFormData).subscribe(response => { })

      newAllergy.push(AllergyFormData);
      this.dataSource.data = newAllergy;
     // this.loadAllergyData();
      this.refreshDataSource();
    }

  }

  deleteAllergy(allergyId: any) {
    this.patientModuleService.deletePatientAllergy(allergyId).subscribe({

    })
    setTimeout(() => {
      //this.loadAllergyData();
      this.getAllergiesByPatientId();
      this.dataSource._updateChangeSubscription();

    }, 1000)
  }

  editAllergy(id: any) {

    let newEditData = this.dataSource.data.filter(value => value.allergyId === id);
    this.allergyFormGroup.controls['emergencyAllergyIdCtrl'].setValue(newEditData[0].allergyCode);
    this.allergyFormGroup.controls['emergencyAllergyTypeCtrl'].setValue(newEditData[0].allergyType);
    this.allergyFormGroup.controls['emergencyAllergyNameCtrl'].setValue(newEditData[0].allergyName);
    this.allergyFormGroup.controls['allergyDescriptionCtrl'].setValue(newEditData[0].allergyDesc);
    this.allergyFormGroup.controls['allergyClinicalCtrl'].setValue(newEditData[0].allergyClinicInfo);
    this.allergyFormGroup.controls['allergyFatelCtrl'].setValue(newEditData[0].allergyFatal);
    this.buttonAddUpdate = false;
    this.tableRecordId = id;
  }

  updateAllergy() {
    let fetchedId = this.tableRecordId;
    console.log("upadteAllergy fetched id: " + fetchedId);
    console.log("upadteAllergy Before dataSource data: " + JSON.stringify(this.dataSource.data));
    let currentData = this.dataSource.data.filter(value => value.allergyId === fetchedId);
    console.log("upadteAllergy fetch Id data:" + JSON.stringify(currentData));

    let AllergyUpdateFormData: AllergyData = {
      patientId: this.patientid,
      allergyId: fetchedId,
      allergyName: this.allergyFormGroup.get('emergencyAllergyNameCtrl').value,
      allergyType: this.allergyFormGroup.get('emergencyAllergyTypeCtrl').value,
      allergyFatal: this.allergyFormGroup.get('allergyFatelCtrl').value,
      allergyDesc: this.allergyFormGroup.get('allergyDescriptionCtrl').value,
      allergyClinicInfo: this.allergyFormGroup.get('allergyClinicalCtrl').value,
      allergyCode: this.allergyFormGroup.get('emergencyAllergyIdCtrl').value
    }
    console.log("Before Updateing Allergy data against Patient: " + JSON.stringify(AllergyUpdateFormData));

    this.patientModuleService.updatePatientAllergy(AllergyUpdateFormData).subscribe({})

    this.buttonAddUpdate = true;

  }

  showPatientReport(){
    
    this.patientModuleService.getPatientById(this.patientid).subscribe(data => {
      this.patientDetailReport.push(data);
      console.log("showPatientReport:"+JSON.stringify(this.patientDetailReport))
    })
    this.patientModuleService.getPatientDemographicById(this.patientid).subscribe(data => {
      this.patientDemographicReport.push(data);
      console.log("showPatientReport:"+JSON.stringify(this.patientDemographicReport))
    })
    this.patientModuleService.getEmergencyDetailsById(this.patientid).subscribe(data => {
      this.patientEmergencyReport.push(data);
      console.log("showEmergencyReport"+JSON.stringify(this.patientEmergencyReport))
    })
    this.patientModuleService.getAllergiesByPatientId(this.patientid).subscribe(data=>{
       for(let i=0; i<data.length; i++){
      this.patientAllergyReport.push(data[i]);
    }
      console.log("showAllergyReport"+JSON.stringify(this.patientAllergyReport))
    })
  }

  routeToPatientDetails(){
    this.router.navigate(['../../patientDetails'],{relativeTo:this.route})
  }

}
