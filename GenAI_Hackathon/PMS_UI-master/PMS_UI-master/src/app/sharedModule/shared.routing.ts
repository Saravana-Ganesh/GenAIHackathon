import { Routes } from "@angular/router";
import { AdminComponent } from "../adminModule/admin/admin.component";
import { WelcomeComponent } from "../entryModule/welcome/welcome.component";
import { ReceivedNotesComponent } from "../inboxModule/notes/reveived-notes/reveived-notes.component";
import { SendNotesComponent } from "../inboxModule/notes/send-notes/send-notes.component";
import { SentNotesComponent } from "../inboxModule/notes/sent-notes/sent-notes.component";
import { UpcomingAppointmentsComponent } from "../inboxModule/upcoming-appointments/upcoming-appointments.component";
import { PatientDemographicsComponent } from "../patientDetailModule/patient-demographics/patient-demographics.component";
import { PatientDetailsComponent } from "../patientDetailModule/patient-details/patient-details.component";
import { PatientVisitComponent } from "../patientVisitModule/patient-visit/patient-visit.component";
import { PhysicianSchedulingComponent } from "../schedulingModule/physician-scheduling/physician-scheduling.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashBoardGuard } from "./gaurds/dash-board.guard";
import { PatientVisitGaurd } from "./gaurds/patient-visit.gaurd";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
// import { DeclinedAppointmentsComponent } from "../declined-appointments/declined-appointments.component";
import { DeclinedAppointmentsComponent } from "../inboxModule/declined-appointments/declined-appointments.component";

export const EntryRoutes: Routes = [
    {
        path:'dashboard',
        component:DashboardComponent,
        canActivate:[DashBoardGuard],
        canActivateChild:[DashBoardGuard],
        children:[
            {
                path:'patientDetails',  //patient, nurse
                component:PatientDetailsComponent,
               // canActivateChild:[DashBoardGuard]
            },
            {
                path:'patientVisit', //nurse, doc
                component:PatientVisitComponent,
                //canActivateChild:[DashBoardGuard]
            },
            {
                path:'physicianSchedule', //all
                component:PhysicianSchedulingComponent
            },
            {
                path:'declineAppointments', //nurse n doc
                component:DeclinedAppointmentsComponent
            },
            {
                path:'inbox', //nurse n doc
                component:UpcomingAppointmentsComponent
            },
            {
                path:'sent-notes',
                component:SentNotesComponent
            },
            {
                path:'received-notes',
                component:ReceivedNotesComponent
            },
            {
                path:'send-notes',
                component:SendNotesComponent
            },
            {
                path:'',
                redirectTo:'patientDetails',
                pathMatch:"full"
            },
            {
                path:'patientDemographic/:id',
                component:PatientDemographicsComponent,
                
            },
            {
                path:'patientDetails',
                component:PatientDetailsComponent
            },
            { path: '**', redirectTo: 'patientDetails'}
        ]
        
    },
    {
        path:'pageNotFound',component:PageNotFoundComponent
    },
   // {path:'/',redirectTo:'pageNotFound'},
   {path:'admin',redirectTo:'admin'},
  // {path:'**',redirectTo:'welcome'}
]