import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';

import { App } from '@capacitor/app';
import { IBackButton } from '../interfaces/IBackButton';

@Injectable({
  providedIn: 'root',
})
export class BackButtonService implements IBackButton {
  routerOutlet: any;
  constructor(
    private platform: Platform,
    private router: Router,
    private navControlelr: NavController,
    private alertController: AlertController
  ) {}

  init() {
    this.platform.backButton.subscribeWithPriority(10, async () => {
      console.log('Handler was called!');
    });

    // document.addEventListener('backbutton', () => {
    //   //alert('backHardwareButton' + this.router.url)
    //   this.performBackButtonAction();
    // });

    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.performBackButtonAction();
      }
    });
  }

  public performBackButtonAction() {
    const currentUrl = this.router.url;

    if (['/listregistros', '/lidermain'].includes(currentUrl.split('?')[0])) {
      this.withAlert('Realmente desea salir?', () => {
        App.exitApp();
      });
    } else {
      this.navControlelr.back();
    }
  }
  async withAlert(message: string, action: () => void) {
    const alert = await this.alertController.create({
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: action,
        },
      ],
    });

    await alert.present();
  }
}
