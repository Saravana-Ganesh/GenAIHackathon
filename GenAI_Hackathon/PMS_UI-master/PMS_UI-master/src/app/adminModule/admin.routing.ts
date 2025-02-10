import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminGuard } from "./guard/admin.guard";
import { HospitalUserManagementComponent } from "./hospital-user-management/hospital-user-management.component";
import { DiagnosisDataComponent } from "./master-data-management/diagnosis-data/diagnosis-data.component";
import { MedicationDataComponent } from "./master-data-management/medication-data/medication-data.component";
import { ProcedureDataComponent } from "./master-data-management/procedure-data/procedure-data.component";
import { PatientUserManagementComponent } from "./patient-user-management/patient-user-management.component";

export const EntryRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate:[AdminGuard],
        children:[
            {
                path:'dashboard',
                component:AdminDashboardComponent
            },
            {
                path:'hospitaluser',
                component:HospitalUserManagementComponent
            },
            {
                path:'patientuser',
                component:PatientUserManagementComponent
            },
            {
                path:'diagnosisdata',
                component:DiagnosisDataComponent
            },
            {
                path:'medicationdata',
                component:MedicationDataComponent
            },
            {
                path:'proceduredata',
                component:ProcedureDataComponent
            }
        ]
    }
]