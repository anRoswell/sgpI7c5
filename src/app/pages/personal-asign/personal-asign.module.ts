import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Route
import { PersonalAsignRoutingModule } from './personal-asign-routing.module';

// Page
import { PersonalAsignPage } from './personal-asign/personal-asign.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonalAsignPage],
  imports: [
    CommonModule,
    IonicModule,
    PersonalAsignRoutingModule,
    ReactiveFormsModule,
  ],
})
export class PersonalAsignModule {}
