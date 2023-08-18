import { Component, Inject, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';

@Component({
  selector: 'app-seguimiento-elector',
  templateUrl: './seguimiento-elector.page.html',
  styleUrls: ['./seguimiento-elector.page.scss'],
})
export class SeguimientoElectorPage implements OnInit {
  public historicosSeguimiento: Array<any> = [];
  constructor(
    @Inject('IHttp') public httpService: IHttp,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.goToHistoricoSeguimiento();
  }

  goToHistoricoSeguimiento() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.httpService
        .Get('seguimiento')
        .subscribe((dataHistoricoSeguimiento) => {
          console.log(dataHistoricoSeguimiento);
          this.historicosSeguimiento = dataHistoricoSeguimiento;
        });
    });
  }

  closeModal() {
    this.modalController.dismiss({
      close: 'yes',
    });
  }
}
