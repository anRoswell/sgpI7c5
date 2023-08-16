import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root',
})
export class CheckconnectionService {
  loading: any;
  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  public async checkConection() {
    const handler = Network.addListener('networkStatusChange', (state) => {});
    // To stop listening:
    // handler.remove();

    // Get the current network status
    const status = await Network.getStatus();

    return status;
  }

  async presentLoading(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      this.loading = await this.loadingController.create({
        message: 'Cargando...',
      });
      await this.loading.present();

      resolve(true);
    });
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  /**
   * Muestra un alert con Botones Cancelar y Reintentar
   */
  private async alrtTryCnxn() {
    const alert = await this.alertController.create({
      header: 'Problemas de conexión',
      message: 'Por favor habilitar conexión a internet',
      buttons: [
        {
          text: 'Re intentar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => this.checkConection(),
        },
      ],
    });

    await alert.present();
  }
}
