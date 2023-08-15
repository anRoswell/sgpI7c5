import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { LoginRoutingModule } from './login-routing.module';

// Pages
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { NovedadesComponent } from './novedades/novedades.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    NovedadesComponent,
    ForgotPasswordComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, LoginRoutingModule, IonicModule, ReactiveFormsModule],
})
export class LoginModule {}
