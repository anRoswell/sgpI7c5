import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateCampaignRoutingModule } from './create-campaign-routing.module';
import { CreateCampaignPage } from './create-campaign/create-campaign.page';
import { ListCampaignPage } from './list-campaign/list-campaign.page';

@NgModule({
  declarations: [CreateCampaignPage, ListCampaignPage],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    CreateCampaignRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CreateCampaignModule {}
