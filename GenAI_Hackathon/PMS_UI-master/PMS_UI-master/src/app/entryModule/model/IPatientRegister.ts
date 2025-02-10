/*
    Author:Nayana Dk
*/
export interface IPatientRegister{
    title:string;
    firstName:string;
    lastName:string;
    emailId:string;
    dateOfBirth:Date;
    countryCode:string;
    phoneNumber:string;
    passwords:IPasswords;
    username:string;
}
export interface IPasswords{
    password:string;
    confirmPassword:string
}