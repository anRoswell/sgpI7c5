import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalAsignPage } from './personal-asign/personal-asign.page';

const routes: Routes = [
  {
    path: 'personal-asign',
    component: PersonalAsignPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalAsignRoutingModule {}
