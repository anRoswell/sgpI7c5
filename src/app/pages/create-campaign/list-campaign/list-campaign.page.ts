import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-list-campaign',
  templateUrl: './list-campaign.page.html',
  styleUrls: ['./list-campaign.page.scss'],
})
export class ListCampaignPage implements OnInit {
  @ViewChild('slidingList') slidingList: any;
  listCampanias: Array<any> | undefined;
  idCompania: number | undefined;
  image = '';

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private router: Router,
    public alertController: AlertController,
    private menu: MenuController,
    private checkconnectionService: CheckconnectionService
  ) {}

  ngOnInit() {
    this.getDataCrearCampania();
  }

  ionViewDidEnter() {
    this.menu.enable(true);
    console.log(
      `Por aqui pasa cada q entra al tab ServiciosPage ionViewDidEnter`
    );
  }

  async goToEditCampania(campania: any) {
    await this.storageService.setData('_campania', campania);
    this.router.navigate([`create-campaign/${campania.id}`]);
  }

  goToNewCampania() {
    this.router.navigate([`create-campaign`]);
  }

  /**
   * Presenta el alert para eliminar una compania
   */
  async presentAlertConfirm(id: number, estado: number) {
    this.idCompania = id;
    const alert = await this.alertController.create({
      cssClass: 'cssAlertConfirm',
      header: 'CONFIRMAR!',
      message: '¿Esta seguro de eliminar esta campaña?',
      inputs: [
        {
          name: 'observation',
          type: 'textarea',
          placeholder: 'Ingrese el motivo de la anulación',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async (blah) => {
            console.log('Confirm Cancel: blah');
            await this.slidingList.closeSlidingItems();
          },
        },
        {
          text: 'Anular',
          handler: async (blah) => {
            this.deleteCompania(blah.observation, estado);
            await this.slidingList.closeSlidingItems();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'CONFIRMACIÓN',
      subHeader: 'Eliminación',
      message: 'Campaña eliminada exitosamente!!!',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  /**
   * Llamamos al backend para q actualice el estado del registro
   */
  private deleteCompania(observation: string, estado: any) {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      const userData: any = await this.storageService.getData('userLogin');
      const object = {
        estado,
        observation,
        userIdUpdatedAt: userData.id,
      };

      await this.checkconnectionService.presentLoading();
      this.http
        .Put(`campania/${this.idCompania}`, object)
        .subscribe((campanias: any) => {
          this.presentAlert();
        });
    });
  }

  /**
   * Obtenemos la data para llenar los selectores
   */
  private getDataCrearCampania() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.http.Get('campania').subscribe((campanias) => {
        this.listCampanias = campanias;
      });
    });
  }

  private validateEstado(estado: number): string {
    return estado === 0 ? 'danger' : 'primary';
  }
}
