import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Patient } from '../model/patient';
import {map, skipWhile, tap} from 'rxjs/operators'
import { AllergyData, EmergencyContactData, PatientAndDemographicData } from '../model/data-models';
@Injectable({
  providedIn: 'root'
})
export class PatientModuleService {
  


  constructor(private httpClient:HttpClient) { }

  private baseURL="/patient-details/api/v1/patients";
  private relationURL="/patient-details/api/v1/relations";
  private baseAllergyURL="/patient-details/api/v1/allergies";
  private baseDemographicURL="/patient-details/api/v1/saveDemographics";
  private baseEmergencyURl="/patient-details/api/v1/saveEmergencyContact";
  
  getPatientList():Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseURL}`);
  }

  getPatientById(id:number):Observable<any>{
    console.log("Posting data using id:"+id);
    //return this.httpClient.get<any>(`${this.baseURL}demographic/${id}`);
    return this.httpClient.get<any>(`${this.baseURL}/${id}`);
  }

  getPatientDemographicById(id:number):Observable<any>{
    console.log("Posting data using id:"+id);
    return this.httpClient.get<any>(`${this.baseURL}demographicId/${id}`);
  }

  getAllRelations():Observable<any>{
    return this.httpClient.get<any>(`${this.relationURL}`);
  }
  
  getAllergyCodes(value:String):Observable<any>{
    return this.httpClient.get<any>(`${this.baseAllergyURL}/${value}`)
  }

  getAllergyNames(value:String):Observable<any>{
    return this.httpClient.get<any>(`${this.baseAllergyURL}name/${value}`)
  }

  getAllergyTypes(value:String):Observable<any>{
    return this.httpClient.get<any>(`${this.baseAllergyURL}type/${value}`)
  }

  
  getAllergyById(code:String):Observable<any>{
    return this.httpClient.get<any>(`${this.baseAllergyURL}/${code}`);
  }

  getAllAllergy():Observable<any>{
    return this.httpClient.get<any>(`${this.baseAllergyURL}`);
  }

  saveAllergy(patientId:number, allergyData:any):Observable<any>{
    return this.httpClient.post<any>(`${this.baseAllergyURL}`,allergyData);
  }

  savePatientDemographic(data:PatientAndDemographicData){
    return this.httpClient.post<any>(this.baseDemographicURL,data);
  }

  getEmergencyDetailsById(id: number):Observable<any> {
    //return this.httpClient.get<any>(`${this.baseURL}emergency/${id}`);
    return this.httpClient.get<any>(`${this.baseURL}EmergencyId/${id}`);
  }

  saveEmergencyDetails(emergencyContactData: EmergencyContactData):Observable<any> {
    return this.httpClient.post<any>(this.baseEmergencyURl,emergencyContactData);
  }

  getAllergiesByPatientId(patientId:number):Observable<any> {
    return this.httpClient.get<any>(`${this.baseURL}allergies/${patientId}`);
  }

  saveAllergyById(AllergyFormData: AllergyData):Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}allergies`,AllergyFormData);
  }

  deletePatientAllergy(allergyId: any):Observable<any> {
     return this.httpClient.delete<any>(`${this.baseURL}allergies/${allergyId}`);
  }

  updatePatientAllergy(AllergyUpdateFormData: AllergyData) {
    return this.httpClient.put<any>(`${this.baseURL}allergies`,AllergyUpdateFormData);
  }
}