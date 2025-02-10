import { Injectable } from '@angular/core';
import { CurrentVisitInfoData } from '../../models/data-model';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private  patientDetail!:CurrentVisitInfoData;

  private visitId!:number|undefined;

  public setPatientDetail(patientDetail:CurrentVisitInfoData):void{
    this.patientDetail = patientDetail;
  }

  public getPatientDetail():CurrentVisitInfoData{
    return this.patientDetail;
  }

  public setVisitId(visitId:number|undefined){
    this.visitId = visitId;
  }

  public getVisitId():number|undefined{
    return this.visitId;
  }

}
