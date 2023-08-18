import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';
import { SeguimientoElectorPage } from '../seguimiento-elector/seguimiento-elector.page';

@Component({
  selector: 'app-new-seguimiento',
  templateUrl: './new-seguimiento.page.html',
  styleUrls: ['./new-seguimiento.page.scss'],
})
export class NewSeguimientoPage implements OnInit {
  public userLogin: any;
  public form: FormGroup;
  public showBtnHistory = false;
  public title = 'Nuevo';
  public historicosSeguimiento: Array<any> = [];

  public validationsMessage = {
    cedula: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'email',
        message: 'Debe ingresar un email valido',
      },
    ],
    primerNombre: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 10 letras para el nombre',
      },
    ],
    apellidoPaterno: [
      {
        type: 'required',
        message: 'Requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 10 letras para el nombre',
      },
    ],
    celular1: [
      {
        type: 'required',
        message: 'El célular es requerido',
      },
      {
        type: 'minlength',
        message: 'Requerido',
      },
    ],
    correo: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    sexo: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    edad: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
    fechaNacimiento: [
      {
        type: 'required',
        message: 'Requerido',
      },
    ],
  };
  action: any;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private fb: FormBuilder,
    private checkconnectionService: CheckconnectionService,
    public alertController: AlertController,
    private modalController: ModalController,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      userIdCreatedAt: [''],
      campananiaID: ['', [Validators.required]],

      nombre: ['', [Validators.required]],
      celular1: ['', [Validators.required]],
      celular2: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      tipoSeguimientoID: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
    });
    this.userLogin = this.storageService.getData('userLogin');
    this.route.queryParams.subscribe(async (params: any) => {
      console.log(params);
      this.action = params.action;
      if (params.action === 'edit') {
        this.showBtnHistory = true;
        this.title = 'Editar';
      } else if (params.action === 'consultar') {
        this.showBtnHistory = true;
        this.title = 'Consultar';
        //this.goToHistoricoSeguimientoLocal();
        this.form.disable();
      }
    });
  }

  ngOnInit() {}

  //#region FORM
  /**
   * Guardamos en base de datos
   */
  public saveForm() {
    this.form.patchValue({
      userIdCreatedAt: this.userLogin.id,
      idCampania: this.userLogin.idCampania,
    });

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const dataForm = this.form.value;
    this.http.Post(dataForm, 'asignarPersonal').subscribe((resp) => {
      console.log(resp);
      this.presentAlert();
    });
  }

  validateNew(): boolean {
    return this.action === 'new';
  }

  /**
   * Metodo q valida los campos de los formularios
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValid(field: string, validationType: string) {
    const f = this.form.get(field);
    return f?.hasError(validationType) && (f.dirty || f.touched);
  }

  editForm(id: any) {
    this.checkconnectionService.checkConection().then(async (_) => {
      this.http.Get(`idelector/${id}`).subscribe((resp) => {
        console.log(resp);
      });
    });
  }

  async goToHistoricoSeguimiento() {
    const objecto = {
      id: 1,
    };
    const modal = await this.modalController.create({
      component: SeguimientoElectorPage,
      componentProps: objecto,
    });

    modal.onDidDismiss().then((result: any) => {
      if (result.data !== undefined) {
        if (result.data.close !== 'yes') {
          console.log(`Se cerro el modal`);
        }
      }
    });
    return await modal.present();
  }

  goToHistoricoSeguimientoLocal() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.http
        .Get('historicoSeguimiento')
        .subscribe((dataHistoricoSeguimiento) => {
          console.log(dataHistoricoSeguimiento);
          this.historicosSeguimiento = dataHistoricoSeguimiento;
        });
    });
  }

  private async getDataSelectFormElector() {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.http.Get('seguimiento').subscribe((dataEditForm) => {
        console.log(dataEditForm);
      });
    });
  }
  //#endregion FORM

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