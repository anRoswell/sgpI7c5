import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';

// Components
import { HomeComponent } from './home/home.component';

// Modules
import { RolesModule } from 'src/app/directives/roles.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule,
    FormsModule,
    RolesModule,
  ],
})
export class HomeModule {}
