import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComunesRoutingModule } from './comunes-routing.module';

// Module
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule, ComunesRoutingModule, PdfViewerModule, IonicModule],
  exports: [MenuComponent],
})
export class ComunesModule {}
