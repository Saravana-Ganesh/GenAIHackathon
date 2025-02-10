import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class sharedService {

    url=""
    constructor(private http:HttpClient){

    }
    
    changePassword(){

    } 
}