import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { ControlElectoresPage } from './control-electores/control-electores.page';
import { CreateElectorPage } from './create-elector/create-elector.page';
import { NewSeguimientoPage } from './new-seguimiento/new-seguimiento.page';
import { SeguimientoElectorPage } from './seguimiento-elector/seguimiento-elector.page';

const routes: Routes = [
  {
    path: 'elector-control',
    component: ControlElectoresPage,
  },
  {
    path: 'create-elector',
    component: CreateElectorPage,
  },
  {
    path: 'seguimiento-elector',
    component: SeguimientoElectorPage,
  },
  {
    path: 'new-seguimiento',
    component: NewSeguimientoPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlElectoresRoutingModule {}
