import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

// Interfaces
import { IAuthenticate } from 'src/app/interfaces/IAuthenticate';
import { IHttp } from 'src/app/interfaces/IHttp';
import { ILogger } from 'src/app/interfaces/ILogger';
import { IStorage } from 'src/app/interfaces/IStorage';

// Services

import { CheckconnectionService } from 'src/app/services/checkconnection.service';

// Entorno
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form: FormGroup;
  public validationsMessage = {
    username: [
      {
        type: 'required',
        message: 'El email es requerido',
      },
      {
        type: 'pattern',
        message: 'ojo! este no es un email valido',
      },
    ],
    password: [
      {
        type: 'required',
        message: 'El password es requerido',
      },
      {
        type: 'minlength',
        message: 'Minimo 8 letras para el password',
      },
    ],
  };
  public permisosState = false;
  public server = environment.urlServer;

  constructor(
    @Inject('ILogger') public logger: ILogger,
    @Inject('IHttp') public http: IHttp,
    @Inject('IAuthenticate') public authenticateService: IAuthenticate,
    @Inject('IStorage') public storageService: IStorage,
    private router: Router,
    private fb: FormBuilder,
    private checkconnectionService: CheckconnectionService,
    private menu: MenuController
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.menu.enable(false);
  }

  /**
   *
   * @param credentials = Data del formulario
   */
  async loginUser(credentials: any) {
    this.checkconnectionService.checkConection().then(async (_) => {
      await this.checkconnectionService.presentLoading();
      this.authenticateService.login$(credentials).subscribe((result) => {
        const { id } = result;
        this.storageService.setData('isUserLoggedIn', true);
        this.storageService.setData('userLogin', result);
        this.goService(id);
      });
    });
  }

  /**
   *
   * @param field = campo a validar
   * @param validationType tipo de validacion a mostrar mensaje de error
   * @returns devuelve boolean
   */
  isValid(field: string, validationType: string) {
    const f = this.form.get(field);
    return f!.hasError(validationType) && (f!.dirty || f!.touched);
  }

  goService(id: number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        action: 'login',
      },
      fragment: 'anchor',
    };

    this.router.navigate(['/home'], navigationExtras);
  }
}
