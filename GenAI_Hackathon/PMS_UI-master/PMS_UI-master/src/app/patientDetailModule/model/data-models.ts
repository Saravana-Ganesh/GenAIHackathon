

export interface PatientData{
    patientId: number,
    title: string,
    firstName:string,
    lastName:string ,
    emailId: string,
    dateOfBirth:string ,
    phoneNumber:string ,
    countryCode:string  
}

export interface DemographicData{
  demographicId: number,
  gender: String,
  race :string,
  ethnicity: String,
  languages: String,
  address: String,
}

export interface PatientAndDemographicData{
    patientUserEntity:PatientData,
    patientDemogrphicEntity:DemographicData
}

export interface EmergencyContactData{
    patientId:number;
    emergencyId:number;
    emergencyFirstName:string;
    emergencyLastName:string;
    emergencyEmail:string;
    emergencyCountryCode:string;
    emergencyContactNo:string;
    emergencyAddress:string;
    emergencyAccessToPortal:string;
    relationShipEntity:RelationshipData
}

export interface RelationshipData{
    id:number;
    relation:string;
}

export interface AllergyData{
    allergyId:number;
	allergyCode:string;
	allergyName:string;
	allergyType:string;
	allergyFatal:string;
	allergyDesc:string;
	allergyClinicInfo:string;
	patientId:number;
}


export interface PatientDemographicReport {
    firstName: string;
   
  }