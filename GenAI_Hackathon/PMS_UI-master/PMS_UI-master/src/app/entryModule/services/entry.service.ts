import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/patientVisitModule/models/api-model';
import { IPatientRegister } from '../model/IPatientRegister';
import { IUserLogin } from '../model/IUserLogin';

@Injectable({
    providedIn: 'root'
})
/*
    Author: Nayana DK
 */
export class EntryService {

    constructor(private http: HttpClient) { }
    //private URL = "/pms/entry/";
    private URL = "entry-service/pms/entry/";

    public loginUserFromRemote(user: IUserLogin): Observable<any> {

        return this.http.post<any>(this.URL + 'login', user);

    }

    public registerPatient(registerData: any) {

        return this.http.post("/pms/entry/register", registerData)
            .pipe(catchError(this.customErrorHandler),
                tap((resData: any) => {
                    console.log("Registration Completed", resData);
                })
            )
    }

    public changePassword(passwordData: any) {
        return this.http.post("/pms/entry/changepassword", passwordData)
            .pipe(
                tap((resData: any) => {
                    console.log("Password changed");
                })
            )
    }

    public forgotpassword(email:string):Observable<ApiResponse>{
        return this.http.get<ApiResponse>(this.URL+'/forgotPassword/'+email);
    }

    customErrorHandler(errorResponse: HttpErrorResponse) {
        let errorText = 'Unknown error occured';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorText);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorText = 'Email already Exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorText = 'Email entered does not Exists/ Invalid EmailId';
                break;
            case 'INVALID_PASSWORD':
                errorText = `'You've entered the wrong password'`;
                break;
        }
        return throwError(errorText);
    }
}