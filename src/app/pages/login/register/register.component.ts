import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ConfirmPasswordValidator } from './confirm-password.validator';

// Librerias
import { Geolocation } from '@capacitor/geolocation';

// Interface
import { IEmailVerification } from 'src/app/interfaces/IEmailVerification';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { CheckconnectionService } from 'src/app/services/checkconnection.service';
import { IStorage } from 'src/app/interfaces/IStorage';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public defaultHref = '';
  emailVerification: IEmailVerification = {
    usrEmail: '',
    usrNames: '',
    usrLastNames: '',
  };
  customActionSheetOptions: any = {
    header: 'Seleccione su PQR',
    cssClass: 'classActionSheetPersonalize',
  };
  stateIdentificationType = {
    cedula: false,
    extranjera: false,
    pasaporte: false,
  };
  unamePattern = '^[a-zA-Z0-9-]{5,15}$';
  numericPatter = '^[0-9]{5,15}$';
  loading: any;
  codigoVerificacion: number = 0;
  errorCodValidation: string = '';
  form: FormGroup;
  form2: FormGroup;
  errorMessage = '';
  public validationsMessage = {
    email: [
      {
        type: 'required',
        message: 'El e-mail es requerido',
      },
      {
        type: 'email',
        message: 'Debe ingresar un email valido',
      },
    ],
    usrPassword: [
      {
        type: 'required',
        message: 'El password es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 caracteres para el password',
      },
    ],
    confirmPassword: [
      {
        type: 'required',
        message: 'Confirmacion password es requerida',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 caracteres para la contraseña',
      },
    ],
    primerNombre: [
      {
        type: 'required',
        message: 'El nombre completo es requerido',
      },
    ],
    apellidoPaterno: [
      {
        type: 'required',
        message: 'El apellido paterno es requerido',
      },
    ],
    mobile: [
      {
        type: 'required',
        message: 'El célular es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 7 numero para el celular',
      },
    ],
    cedula: [
      {
        type: 'required',
        message: 'La cedula es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo número de digitos (6)',
      },
    ],
  };
  public validarUsuario = true;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public httpService: IHttp,
    @Inject('IStorage') public storageService: IStorage,
    private checkconnectionService: CheckconnectionService
  ) {
    this.form = this.formBuilder.group(
      {
        idCampania: ['', [Validators.required]],
        pJerarquiasID: ['', [Validators.required]],
        userIDPadre: ['', [Validators.required]],
        userIDAsignador: ['', [Validators.required]],
        cedula: ['', [Validators.required, Validators.minLength(6)]],
        primerNombre: ['', [Validators.required]],
        segundoNombre: [''],
        apellidoPaterno: ['', [Validators.required]],
        apellidoMaterno: [''],
        apellidoCasado: [''],
        email: ['', [Validators.required, Validators.email]],
        usrPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        mobile: ['', [Validators.required]],
        usrTerminosCondiciones: [false, [Validators.requiredTrue]],
        token: ['', [Validators.required]],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    this.form2 = this.formBuilder.group({
      cedula: [],
      token: [],
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/login`;
  }

  //#region FORMULARIO
  /**
   * Metodo q recibe data del form y envia a service para procesarla
   */
  async register() {
    const token = this.form2.get('token')!.value;
    this.form.patchValue({
      token,
    });
    const registerUserData = this.form.value;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.presentAlert(
        'VALIDACIONES',
        'Debe llenar todos los campos obligatorios'
      );
      return;
    }

    await this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();

      this.httpService
        .Post(registerUserData, 'registrarUsuario')
        .subscribe((resp: any) => this.presentAlertConfirmRegister());
    });
  }

  async validarInvitacion() {
    await this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();

      const params = new HttpParams().set(
        'token',
        this.form2.get('token')!.value.toString()
      );

      this.httpService
        .GetParams(
          `validateInvitation/${this.form2.get('cedula')!.value.toString()}`,
          params
        )
        .subscribe((dataEditForm: any) => {
          this.validarUsuario = false;
          const {
            cedula,
            email,
            idCampania,
            pJerarquiasID,
            userIDAsignador,
            userIDPadre,
          } = dataEditForm[0][0];

          this.form.patchValue({
            cedula,
            email,
            idCampania,
            pJerarquiasID,
            userIDAsignador,
            userIDPadre,
          });
        });
    });
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
    return f!.hasError(validationType) && (f!.dirty || f!.touched);
  }
  //#endregion FORMUALRIO

  goToLogin() {
    this.navCtrl.navigateBack('/login');
  }

  public async confirmarCodigoSaveForm(messageMsge = '') {
    const alert = await this.alertController.create({
      header: 'CODIGO VALIDACIÓN!',
      subHeader: 'Enviado a correo registrado!!!',
      message: messageMsge,
      backdropDismiss: false,
      inputs: [
        {
          name: 'codigoVerificacion',
          type: 'number',
          placeholder: 'Ingrese codigo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // this.goToLogin()
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          cssClass: 'primary',
          handler: ({ codigoVerificacion }) => {
            if (this.codigoVerificacion === parseInt(codigoVerificacion, 10)) {
              this.register();
            } else {
              this.confirmarCodigoSaveForm(
                `<ion-text color="danger"><strong>Codigo invalido...</strong></ion-text>`
              );
              this.errorCodValidation = `Codigo de verificación incorrecto, ${codigoVerificacion}`;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  public async presentAlertConfirmRegister() {
    const alert = await this.alertController.create({
      header: 'REGISTRO EXITOSO!',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          cssClass: 'primary',
          handler: () => {
            this.goToLogin();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAlert(header: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'classAlertContrato',
      header,
      message: `<strong>${msg}</strong>`,
      buttons: [
        {
          text: 'OK',
          handler: () => {},
        },
      ],
    });
    await alert.present();
  }

  /**
   * Validacion Asyncrona, no funciona aun
   */
  validateEmailRegistred() {
    return (control: AbstractControl) => {
      const data = {
        email: control.value,
      };

      this.httpService
        .Post('/validateEmailRegistred', data)
        .subscribe((response: any) =>
          response ? null : { notAvailable: true }
        );
    };
  }

  back() {
    //this.location.back();
  }

  private getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition().then(
        (position: any) => {
          this.form.patchValue({
            hasGeolocation: true,
            usrLat: position.coords.latitude,
            usrLng: position.coords.longitude,
          });
          resolve(position);
        },
        (err: any) => {
          reject('No se pudo obtener localización.');
        }
      );
    });
  }
}
