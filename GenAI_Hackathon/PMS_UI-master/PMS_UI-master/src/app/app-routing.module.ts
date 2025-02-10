import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './adminModule/admin/admin.component';
import { AboutUsComponent } from './entryModule/about-us/about-us.component';
import { PatientComponent } from './patientModule/patient/patient.component';
import { DashboardComponent } from './sharedModule/dashboard/dashboard.component';
import { PatientVisitGaurd } from './sharedModule/gaurds/patient-visit.gaurd';
import { PageNotFoundComponent } from './sharedModule/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  { path: 'patient', component: PatientComponent },
  {path:'aboutus',component:AboutUsComponent},
 // {path:'dashboard',component:DashboardComponent},
  //{ path: '**', pathMatch: 'full', redirectTo: 'welcome' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers:[PatientVisitGaurd]
})
export class AppRoutingModule { }
