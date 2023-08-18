import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';

@Component({
  selector: 'app-personal-asign',
  templateUrl: './personal-asign.page.html',
  styleUrls: ['./personal-asign.page.scss'],
})
export class PersonalAsignPage implements OnInit {
  public campanias: any = [];
  public form: FormGroup;
  public userLogin: any;

  public jerarquias: Array<any> | undefined;
  public users: Array<any> | undefined;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private fb: FormBuilder,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController
  ) {
    this.form = this.fb.group({
      userIDPadre: ['', [Validators.required]],
      userIDAsignador: ['', [Validators.required]],
      idCampania: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      pJerarquiasID: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    this.userLogin = await this.storageService.getData('userLogin');
    console.log(this.userLogin);
    this.getJerarquias();
    this.listenFormOnChange();
  }

  async ngAfterViewInit() {}

  /**
   * Guardamos en base de datos
   */
  public saveForm() {
    this.form.patchValue({
      userIDAsignador: this.userLogin.id,
      idCampania: this.userLogin.idCampania,
    });

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataForm = this.form.value;
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.http.Post('asignarPersonal', dataForm).subscribe((resp) => {
        console.log(resp);
        this.presentAlert();
      });
    });
  }

  /**
   *
   */
  private async getJerarquias() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      const params = new HttpParams().set(
        'idCampania',
        this.userLogin.idCampania.toString()
      );
      this.http
        .GetParams(`spjerarquia/${this.userLogin.pJerarquiasID}`, params)
        .subscribe((resp) => {
          console.log(resp);
          this.jerarquias = resp[1];
        });
    });
  }

  private listenFormOnChange() {
    this.form.get('pJerarquiasID')?.valueChanges.subscribe((pJerarquiasID) => {
      this.checkconnectionService.checkConection().then(async (_) => {
        await this.checkconnectionService.presentLoading();
        const params = new HttpParams()
          .set('idCampania', this.userLogin.idCampania.toString())
          .set('pJerarquiasIDSelected', pJerarquiasID.toString());
        this.http
          .GetParams(`spGetUsuario/${this.userLogin.pJerarquiasID}`, params)
          .subscribe((resp) => {
            console.log(resp);
            this.users = resp[0];
          });
      });
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
}
