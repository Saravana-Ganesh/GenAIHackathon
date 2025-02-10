export interface IHospitalUser {
    employeeId: string
    firstName: string;
    lastName:string;
    emailId:string;
    dateOfBirth:string;
    dateOfJoining: Date;
    status: string;
    // link1?: string;
    // link2?: string;
    // edit: string;
}

export interface UserInfoForDashboard{
    inActiveHospitalUser:number;
    activeHospitalUser:number;
    blockedHospitalUser:number;
    nurseCount:number;
    activePatientUSer:number;
    patientCount:number;
    inActivePatientUser:number;
    doctorCount:number;
    blockedPatientUser:number;
}

export interface ApiResponse{
    statusCode:number
    statusMessage:string;    
    responseData:any
}