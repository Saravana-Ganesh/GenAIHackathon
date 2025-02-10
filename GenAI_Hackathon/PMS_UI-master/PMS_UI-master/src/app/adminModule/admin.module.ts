import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { HospitalUserManagementComponent } from './hospital-user-management/hospital-user-management.component';
import { PatientUserManagementComponent } from './patient-user-management/patient-user-management.component';
import { EntryRoutes } from './admin.routing';
import { AddUserComponent } from './add-user/add-user.component';
import { DiagnosisDataComponent } from './master-data-management/diagnosis-data/diagnosis-data.component';
import { MedicationDataComponent } from './master-data-management/medication-data/medication-data.component';
import { ProcedureDataComponent } from './master-data-management/procedure-data/procedure-data.component';
import { AddProcedureComponent } from './master-data-management/add-procedure/add-procedure.component';
import { AddDiagnosisComponent } from './master-data-management/add-diagnosis/add-diagnosis.component';
import { AddMedicationComponent } from './master-data-management/add-medication/add-medication.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';



@NgModule({
  declarations: [
    AdminComponent,
    SidebarNavComponent,
    HospitalUserManagementComponent,
    PatientUserManagementComponent,
    AddUserComponent,
    DiagnosisDataComponent,
    MedicationDataComponent,
    ProcedureDataComponent,
    AddProcedureComponent,
    AddDiagnosisComponent,
    AddMedicationComponent,
    AdminDashboardComponent,
    DialogBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EntryRoutes),
    NgChartsModule
  ]
})
export class AdminModule { }
