import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiResponse, IHospitalUser } from '../model/HospitalUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private title ="Admin Dashboard";
  public setTitle(title:string){
    this.title = title;
  }

  public getTitle():string{
    return this.title;
  }
  // hurl = "/pms/hospitaluser/";
  // purl = "/pms/patientuser/";
  // murl = "/pms/masterdata/";
  
  hurl = "admin-service/pms/hospitaluser/";
  purl = "admin-service/pms/patientuser/";
  murl = "admin-service/pms/masterdata/";

  constructor(private http: HttpClient) { }

  getAllHospitalUsers() {
    //const url = "http://localhost:3000/hospitaluser/";
    return this.http.get<any>(this.hurl + "hospitalUsers").pipe(tap((usersData: any) => {
      console.log("Hospital Users", usersData);
      return usersData;
    }))
  }

  public registerHospitalUser(registerData: IHospitalUser) {
    //const url = "http://localhost:3000/hospitaluser/";
    //registerData.dateOfJoining = new Date();
    //registerData.status = "active";

    return this.http.post(this.hurl + "register", registerData).pipe(tap((resData: any) => {
      console.log("Registration Success", resData);
      return resData;
    })
    )

  }

  public updateHospitalUser(updateData: IHospitalUser, id: number) {
    //const url = "http://localhost:3000/hospitaluser/";
    return this.http.post<any>(this.hurl + "update/" + id, updateData);
  }

  public deleteHospitalUser(id: number) {
    const url = "http://localhost:3000/hospitaluser/";
    return this.http.delete<any>(url + id);
  }

  public activateHospitalUser(id: number) {
    return this.http.post(this.hurl + "activateAccount", id);
  }

  public deactivateHospitalUser(id: number) {
    return this.http.post(this.hurl + "deactivateAccount", id);
  }

  public blockHospitalUser(id: number) {
    return this.http.post(this.hurl + "blockAccount", id);
  }

  public deletePatientUser(id: number) {
    const url = "http://localhost:3000/hospitaluser/";
    return this.http.delete<any>(url + id);
  }

  public activatePatientUser(id: number) {
    return this.http.post(this.purl + "activateAccount", id);
  }

  public deactivatePatientUser(id: number) {
    return this.http.post(this.purl + "deactivateAccount", id);
  }

  public blockPatientUser(id: number) {
    return this.http.post(this.purl + "blockAccount", id);
  }

  public getAllPatientUsers() {
    //const url = "http://localhost:3000/patientuser/";
    return this.http.get<any>(this.purl + "/patientUsers").pipe(tap((usersData: any) => {
      console.log("Patient Users", usersData);
      return usersData;
    }))
  }

  public getAllDiagnosisData() {
    return this.http.get<any>(this.murl + "diagnosis").pipe(tap((diagnosisData: any) => {
      console.log("Diagnosis Data", diagnosisData);
      return diagnosisData;
    }))
  }

  public addDiagnosisData(diagnosisData: any) {
    return this.http.post(this.murl + "diagnosis", diagnosisData).pipe(tap((resData: any) => {
      console.log("Data added", resData);
      return resData;
    })
    )
  }

  public updateDiagnosisData(diagnosisData: any, code: string) {
    return this.http.put<any>(this.murl + "diagnosis/" + code, diagnosisData);
  }

  public deleteDiagnosisData(code: string) {
    return this.http.delete(this.murl + "diagnosis/" + code, { responseType: 'text' });
  }

  public deprecateDiagnosisData(code: string) {
    return this.http.post(this.murl + "diagnosis/deprecate" , code);
  }

  public getAllProcedureData() {
    return this.http.get<any>(this.murl + "procedure").pipe(tap((procedureData: any) => {
      console.log("Procedure Data", procedureData);
      return procedureData;
    }))
  }

  public addProcedureData(procedureData: any) {
    return this.http.post(this.murl + "procedure", procedureData).pipe(tap((resData: any) => {
      console.log("Data added", resData);
      return resData;
    })
    )
  }

  public updateProcedureData(procedureData: any, code: string) {
    return this.http.put<any>(this.murl + "procedure/" + code, procedureData);
  }

  public deleteProcedureData(code: string) {
    return this.http.delete(this.murl + "procedure/" + code, { responseType: 'text' });
  }

  public deprecateProcedureData(code: string) {
    return this.http.post(this.murl + "procedure/deprecate" , code);
  }

  public getAllMedicationData() {
    return this.http.get<any>(this.murl + "medication").pipe(tap((medicationData: any) => {
      console.log("Medication Data", medicationData);
      return medicationData;
    }))
  }

  public addMedicationData(medicationData: any) {
    return this.http.post(this.murl + "medication", medicationData).pipe(tap((resData: any) => {
      console.log("Data added", resData);
      return resData;
    })
    )
  }

  public updateMedicationData(medicationData: any, code: string) {
    return this.http.put<any>(this.murl + "medication/" + code, medicationData);
  }

  public deleteMedicationData(code: string) {
    return this.http.delete(this.murl + "medication/" + code, { responseType: 'text' });
  }

  public deprecateMedicationData(code: string) {
    return this.http.post(this.murl + "medication/deprecate" , code);
  }

  public getDashboardData(){
    return this.http.get<ApiResponse>(this.hurl+'getAllUsers');
  }

}


