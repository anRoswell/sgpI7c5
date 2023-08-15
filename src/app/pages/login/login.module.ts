import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Modules
import { LoginRoutingModule } from './login-routing.module';

// Pages
import { NovedadesComponent } from './novedades/novedades.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, NovedadesComponent],
  imports: [CommonModule, LoginRoutingModule, IonicModule],
})
export class LoginModule {}
