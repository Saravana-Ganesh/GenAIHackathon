import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SharedModule } from '../sharedModule/shared.module';
import { RouterModule } from '@angular/router';
import { EntryRoutes } from './entry-routing';
import { RegisterNewComponent } from './register-new/register-new.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    SidenavListComponent,
    RegisterNewComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(EntryRoutes)
  ],
  exports:[
    FormsModule
  ]
})
export class EntryModule { }
