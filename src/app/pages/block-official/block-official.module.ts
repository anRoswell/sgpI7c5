import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { BlockOfficialRoutingModule } from './block-official-routing.module';
import { BlockOfficialPage } from './block-official/block-official.page';

@NgModule({
  declarations: [BlockOfficialPage],
  imports: [
    CommonModule,
    BlockOfficialRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
})
export class BlockOfficialModule {}
