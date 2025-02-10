export interface DiagnosisData{
    diagnosisCode:string;
    diagnosisDescription:string;
}
export interface ProcedureData{
    procedureCode:string;
    procedureDescription:string;
}

export interface MedicationData{
    drugId:string;
    drugName:string;
    drugGenericName:string;
    drugBrandName:string;
    drugForm:string;
    drugStrength:string;
}

export interface CurrentVisitInfoData {
    empId: string;
    physicianName: string;
    physicianEmail: string;
    patientName: string;
    patientEmail: string;
    patientId:string;
    meetingId:string;
}

export interface VitalDetails{
    visitId?:number;
    patientId:String;
    height:Number;
    weight:Number;
    bloodPressure:Number;
    bodyTemperature:string;
    respirationRate:Number;
}

export interface PatientDiagnosisInfo{
    visitId:number;
    diagnosisCode:string;
    otherDiagnosisIfAny:string;
    isDeprecated:boolean;
}

export interface PatientProcedureInfo{
    visitId:number;
    procedureCode:string;
    ifOtherProcedure:string;
    isDeprecated:boolean;
}

export interface PatientMedicationInfo{
    visitId:number;
    drugId:string;
}
 