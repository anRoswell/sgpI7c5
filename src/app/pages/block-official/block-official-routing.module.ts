import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockOfficialPage } from './block-official/block-official.page';

const routes: Routes = [
  {
    path: 'block-official',
    component: BlockOfficialPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlockOfficialRoutingModule {}
