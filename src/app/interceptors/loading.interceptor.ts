import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, EMPTY, throwError } from 'rxjs';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { catchError, finalize } from 'rxjs/operators';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loaders = new Array<HTMLIonLoadingElement>();
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private auth: AuthenticateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const checkEmail = request.url.indexOf('checkEmail');
    const getCicloCodi = request.url.indexOf('getCicloCodi');

    this.dismissLoading();

    if (checkEmail === -1 && getCicloCodi === -1) {
      this.loadingCtrl.getTop().then(async (hasLoading) => {
        if (!hasLoading) {
          await this.loadingCtrl
            .create({
              spinner: 'circular',
              translucent: true,
            })
            .then((loading) => {
              this.loaders.push(loading);
              loading.present();
            });
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          const { status } = err;
          const { error } = err;
          console.log(`Error ${status}`);
          switch (status) {
            case 0:
              return throwError(err);
            case 400:
              return throwError(err);
            case 401:
            case 403:
              this.auth.logout();
              return throwError(err);
            case 404:
              return throwError(err);
            case 500:
              return throwError(err);
            default:
              return throwError(err);
          }
        } else {
          return throwError(err);
        }
      }),
      catchError((err) => {
        let mensaje500 = `[HTTP 500] Internal error...`;
        switch (err.status) {
          case 0:
            mensaje500 = `Sin conexión a la red`;
            break;
          default:
            mensaje500 = err.error ? err.error.message : mensaje500;
            break;
        }
        this.presentFailedAlert(mensaje500);
        //return throwError(errorResponse)
        return EMPTY;
      }),
      finalize(() => {
        this.dismissLoading();
      })
    );
  }

  /**
   * Muestra Toast con los intentos de reconexión
   * @param retryCount = contador con numero de intentos
   */
  async showRetryToast(retryCount: any) {
    const toast = await this.toastCtrl.create({
      message: `Re intentar ${retryCount}/ 3`,
      duration: 3000,
    });
    toast.present();
  }

  /**
   * Presenta mensaje de error
   * @param msg = mensaje de error a mostrar
   */
  async presentFailedAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();

    this.dismissLoading();
  }

  /**
   * Dismiss all the pending loaders, if any
   */
  async dismissLoading() {
    if (this.loaders && this.loaders.length > 0) {
      this.loaders.forEach(async (loader) => {
        await loader
          .dismiss()
          .then(() => {
            loader;
          })
          .catch((e) => console.log(e))
          .finally(() => (this.loaders = new Array<HTMLIonLoadingElement>()));
      });
    }
  }
}
