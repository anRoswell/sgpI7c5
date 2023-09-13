import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';
import { NewSeguimientoPage } from '../new-seguimiento/new-seguimiento.page';

@Component({
  selector: 'app-seguimiento-elector',
  templateUrl: './seguimiento-elector.page.html',
  styleUrls: ['./seguimiento-elector.page.scss'],
})
export class SeguimientoElectorPage implements OnInit {
  public historicosSeguimiento: Array<any> = [];
  private elector: any;
  historicosSeguimientoCantidad: any;
  constructor(
    @Inject('IHttp') public httpService: IHttp,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController,
    public modalController: ModalController,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(async (params: any) => {
      console.log(params);
      this.elector = params;
    });
  }

  ngOnInit() {
    this.goToHistoricoSeguimiento();
  }

  goToHistoricoSeguimiento() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.httpService
        .Get(`seguimiento/${this.elector.id}`)
        .subscribe((dataHistoricoSeguimiento) => {
          console.log(dataHistoricoSeguimiento);
          this.historicosSeguimiento = dataHistoricoSeguimiento;
          this.historicosSeguimientoCantidad =
            this.historicosSeguimiento.length;
        });
    });
  }

  async newSeguimiento() {
    const modal = await this.modalController.create({
      component: NewSeguimientoPage,
      componentProps: {
        model_title: "Nomadic model's reveberation",
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(`Hello, ${data}!`);
    }
  }

  closeModal() {
    this.modalController.dismiss({
      close: 'yes',
    });
  }
}
