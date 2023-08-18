import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

// Route
import { ControlElectoresRoutingModule } from './control-electores-routing.module';

// Pages
import { ControlElectoresPage } from './control-electores/control-electores.page';
import { CreateElectorPage } from './create-elector/create-elector.page';
import { NewSeguimientoPage } from './new-seguimiento/new-seguimiento.page';
import { SeguimientoElectorPage } from './seguimiento-elector/seguimiento-elector.page';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ControlElectoresPage,
    CreateElectorPage,
    NewSeguimientoPage,
    SeguimientoElectorPage,
  ],
  imports: [
    CommonModule,
    ControlElectoresRoutingModule,
    ReactiveFormsModule,
    IonicModule,
    ScrollingModule,
  ],
})
export class ControlElectoresModule {}
