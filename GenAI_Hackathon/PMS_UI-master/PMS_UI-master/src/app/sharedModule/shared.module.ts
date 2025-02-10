import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './materialModule/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { RouterModule } from '@angular/router';
import { EntryRoutes } from './shared.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { JwtInterceptor } from './services/basic-authentication.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarNavComponent,
    PageNotFoundComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(EntryRoutes),
    ToastrModule.forRoot(),
    FormsModule
  ],
  exports:[
    MaterialModule,
    FormsModule, 
    Ng2TelInputModule,
    ReactiveFormsModule,
    HttpClientModule  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
})
export class SharedModule { }
