import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicSafeString } from '@ionic/angular';
import { IAuthenticate } from 'src/app/interfaces/IAuthenticate';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { ConfirmPasswordValidator } from '../register/confirm-password.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  usuarioName: string | undefined;
  userData: any = {};
  paso1 = true;
  paso2 = false;
  paso3 = false;
  codVerificacion: number | undefined;
  formUno: FormGroup;
  formDos: FormGroup;
  formTres: FormGroup;
  wrongCodVerificacion: string | undefined;
  idUser: string | undefined;

  validationsMessage = {
    emailRecovery: [
      {
        type: 'required',
        message: 'El e-mail es requerido',
      },
      {
        type: 'email',
        message: 'Digite por favor un email valido',
      },
    ],
    codVerficacion: [
      {
        type: 'required',
        message: 'El nombre es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 2 caracteres para el codVerficacion',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'El Password es requerido',
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
  };

  constructor(
    private fb: FormBuilder,
    @Inject('IAuthenticate') public authenticateService: IAuthenticate,
    @Inject('ILogger') public logger: ILogger,
    public alertController: AlertController,
    private router: Router,
    @Inject('IHttp') public httpService: IHttp,
    // private location: Location
  ) {
    this.formUno = this.fb.group({
      emailRecovery: ['', [Validators.required, Validators.email]],
    });

    this.formDos = this.fb.group({
      codVerficacion: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.formTres = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );
  }

  async ngOnInit() {}

  recoveryPasswordMail(dataForm1: any) {
    this.httpService
      .Post( `rvyauth/recoverypass`,{ emailRecovery: dataForm1.emailRecovery })
      .subscribe((resp) => {
        this.codVerificacion = resp.codVerificacion;
        this.idUser = resp.id;
        this.paso1 = false;
        this.paso2 = true;
        this.paso3 = false;
      });
  }

  compareCodVerificacion(codVer: any) {
    if (parseInt(codVer.codVerficacion, 10) !== this.codVerificacion) {
      this.wrongCodVerificacion = `Codigo incorrecto por favor verificar!!!`;
    } else {
      this.wrongCodVerificacion = '';
      this.paso1 = false;
      this.paso2 = false;
      this.paso3 = true;
    }
  }

  /**
   * Actualizamos password
   *
   * @param dataFormTres Obtenemos datos del formulario numero tres
   */
  updatePassword(dataFormTres: any) {
    this.authenticateService.updatePassword(this.idUser, dataFormTres.password).subscribe(
      (resp:any) => {
        this.presentAlert(resp[0][0].msg);
      },
      (error:any) => console.log(error)
    );
  }

  noRecibistesCodigo() {}

  /**
   * Metodo q valida los campos de los formularios
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValidUno(field: string, validationType: string) {
    const f = this.formUno.get(field);
    return f?.hasError(validationType) && (f.dirty || f.touched);
  }

  /**
   * Metodo q valida los campos de los formularios
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValidDos(field: string, validationType: string) {
    const f = this.formDos.get(field);
    return f?.hasError(validationType) && (f.dirty || f.touched);
  }

  /**
   * Metodo q valida los campos de los formularios
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValidTres(field: string, validationType: string) {
    const f = this.formTres.get(field);
    return f?.hasError(validationType) && (f.dirty || f.touched);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'classAlertContrato',
      header: 'ACTUALIZAR CONTRASEÑA',
      message: new IonicSafeString(`<strong>${msg}</strong>`),
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
      ],
    });
    await alert.present();
  }

  goBack() {
    //this.location.back();
  }
}
