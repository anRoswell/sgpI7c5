import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Service
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    //redirectTo: 'folder/Inbox',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/create-campaign/create-campaign.module').then(
        (m) => m.CreateCampaignModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/personal-asign/personal-asign.module').then(
        (m) => m.PersonalAsignModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/control-electores/control-electores.module').then(
        (m) => m.ControlElectoresModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
