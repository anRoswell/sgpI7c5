import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';

// Intarface
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';

// Service
import { CheckconnectionService } from 'src/app/services/checkconnection.service';

@Component({
  selector: 'app-block-official',
  templateUrl: './block-official.page.html',
  styleUrls: ['./block-official.page.scss'],
})
export class BlockOfficialPage implements OnInit {
  public userLogin: any;
  public form: FormGroup;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public httpService: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private fb: FormBuilder,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController
  ) {
    this.form = this.fb.group({
      cedula: new FormControl([]),
      find: new FormControl([]),
    });
  }

  async ngOnInit() {
    this.userLogin = await this.storageService.getData('userLogin');
  }

  /**
   * Guardamos en base de datos
   */
  public saveForm(form: any) {
    this.form.patchValue({
      userIDAsignador: this.userLogin.id,
      idCampania: this.userLogin.idCampania,
    });

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataForm = this.form.value;
    this.httpService.Post(dataForm, 'asignarPersonal').subscribe((resp) => {
      console.log(resp);
      this.presentAlert();
    });
  }

  private async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'cssAlertConfirmGreen',
      header: 'CONFIRMACIÓN',
      message: 'Registro exitoso!!!',
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  click() {}
}
