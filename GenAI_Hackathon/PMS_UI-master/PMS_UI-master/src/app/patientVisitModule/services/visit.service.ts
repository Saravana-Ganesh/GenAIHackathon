import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, SearchContent } from '../models/api-model';
import { PatientDiagnosisInfo, PatientMedicationInfo, PatientProcedureInfo, VitalDetails } from '../models/data-model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  constructor( private httpClient:HttpClient) { }
  static URL = "/visit-service/api/v1/";

  getDiagnosisData(searchTextObj:SearchContent,filterBy:string):Observable<ApiResponse>{
    if(filterBy=='diagnosisCode'){
      return this.httpClient.post<ApiResponse>(VisitService.URL+'searchDiagnosisCode',searchTextObj);
    }
    return this.httpClient.post<ApiResponse>(VisitService.URL+'searchDiagnosisDescription',searchTextObj);  
  }

  getProcedureData(searchTextObj:SearchContent,filterBy:string):Observable<ApiResponse>{
    if(filterBy=='procedureCode'){
      return this.httpClient.post<ApiResponse>(VisitService.URL+'searchProcedureCode',searchTextObj);
    }
    return this.httpClient.post<ApiResponse>(VisitService.URL+'searchProcedureDescription',searchTextObj);  
  }

  getMedicationData(searchTextObj:SearchContent,filterBy:string):Observable<ApiResponse>{
    if(filterBy=='medicationCode'){
        return this.httpClient.post<ApiResponse>(VisitService.URL+'searchMedicationCode',searchTextObj);    
    }else{
      return this.httpClient.post<ApiResponse>(VisitService.URL+'searchDrugName',searchTextObj);    
    }
  }

  getCurrentVisitInfo():Observable<ApiResponse>{

    if(window.sessionStorage.getItem('role')=='ROLE_PHYSICIAN'){

      return this.httpClient.get<ApiResponse>(VisitService.URL+'VisitInfoPhysician/'+window.sessionStorage.getItem('username'));

    }else if(window.sessionStorage.getItem('role')=='ROLE_PATIENT'){

      return this.httpClient.get<ApiResponse>(VisitService.URL+'VisitInfoPatient/'+window.sessionStorage.getItem('userId'));
    }
    return this.httpClient.get<ApiResponse>(VisitService.URL+'VisitInfoNurse');
  }
  
  saveOrUpdateVitalSign(vitalDetailForm:VitalDetails):Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(VisitService.URL+'saveVitalDetails',vitalDetailForm)
  }

  getVitalSignData(id:string):Observable<ApiResponse>{
    
    return this.httpClient.get<ApiResponse>(VisitService.URL+'getVisitDetails/'+id)
  }

  getVitalSignDataforPatientUser(id:string):Observable<ApiResponse>{

    return this.httpClient.get<ApiResponse>(VisitService.URL+'getVitalSignDataforPatientUser/'+id)
  }
  getPatientDiagnosisData(visitId:number):Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(VisitService.URL+'patientDiagnosisInfo/'+visitId);
  }

  saveOrUpdatePatientDiagnosisData(patientDiagnosisInfoList:PatientDiagnosisInfo[]):Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(VisitService.URL+'savePatientDiagnosis',patientDiagnosisInfoList)
  }

  getPatientProcedureData(visitId:number):Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(VisitService.URL+'patientProcedureInfo/'+visitId);
  }

  saveOrUpdatePatientProcedureData(patientProcedureInfoList:PatientProcedureInfo[]):Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(VisitService.URL+'savePatientProcedure',patientProcedureInfoList)
  }

  savePatientMedicationData(medicationDataList:PatientMedicationInfo[],meetingId:string):Observable<ApiResponse>{
    return this.httpClient.post<ApiResponse>(VisitService.URL+'saveMedicationData/'+meetingId,medicationDataList)
  }

  getPatientMedicationData(visitId:number):Observable<ApiResponse>{
    return this.httpClient.get<ApiResponse>(VisitService.URL+'fetchMedicationData/'+visitId);
  }

}
