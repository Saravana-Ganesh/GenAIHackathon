// import { TestBed } from '@angular/core/testing';

// import { BasicAuthenticationService } from './basic-authentication.service';

// describe('BasicAuthenticationService', () => {

//   userdata: any;
//   jwtToken:string="";
//   constructor(private router: Router,
//               private sessionStorage:SessionStorageService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler) {
//     console.log("insde interceptor")
//     const userJson = sessionStorage.getItem('userdetails');
//     this.userdata = userJson !== null ? JSON.parse(userJson) : "";
//     let httpHeaders = new HttpHeaders();

//     if(this.userdata && this.userdata.password && this.userdata.email){
//       httpHeaders = httpHeaders.append('Authorization', 'Basic ' + btoa(this.userdata.email + ':' + this.userdata.password));
//     }
//     if(this.sessionStorage.getJwtToken() != null)
//     {
//       httpHeaders = httpHeaders.append(Constants.SECURE_TOKEN, this.sessionStorage.getJwtToken());
//     }
//     let basicAuth = req.clone({
//         headers: httpHeaders
//     })
//     return next.handle(basicAuth).pipe(
//       map((event:HttpEvent<any>) => {
//         if(event instanceof HttpResponse)
//         {
//          this.sessionStorage.saveJwtToken(event);
//         }
//         return event;
//        })
//     );
//   }
// });
