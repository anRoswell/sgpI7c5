import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCampaignPage } from './create-campaign/create-campaign.page';
import { ListCampaignPage } from './list-campaign/list-campaign.page';

const routes: Routes = [
  {
    path: 'create-campaign',
    component: CreateCampaignPage,
  },
  {
    path: 'create-campaign/:id',
    component: CreateCampaignPage,
  },
  {
    path: 'list-campaign',
    component: ListCampaignPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateCampaignRoutingModule {}
