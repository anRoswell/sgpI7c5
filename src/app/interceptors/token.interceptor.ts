import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  map,
  of,
  share,
  switchMap,
  throwError,
} from 'rxjs';

// Environment
import { environment } from '../../environments/environment';

// Service
import { AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { IStorage } from '../interfaces/IStorage';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(
    @Inject('IStorage') public storageService: IStorage,
    @Inject('IAuthenticate')
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Presentamos el Loading al inicio de la llamada
    this.requests.push(req);

    // add authorization header with jwt token if available
    const token = sessionStorage.getItem('_token');
    console.log(token);

    let authReq: HttpRequest<any> = this.addToken(req, token);
    // if (token !== undefined && req.url.indexOf(environment.urlServer) !== -1) {
    //   authReq = this.addToken(req, token);
    // }

    //return next.handle(request);
    return next.handle(authReq).pipe(
      share(),
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(req);
          let token = event.headers.get('Authorization');
          if (token) {
            sessionStorage.setItem('_token', token);
            //this.authService.isAuthenticated.next(true);
          }
        }

        return event;
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        const { status } = errorResponse;
        const { error } = errorResponse;
        switch (status) {
          case 400:
            let mensaje400 = `[HTTP 404] Servidor no encontrado...`;
            mensaje400 = error.body ? error.body : mensaje400;
            this.presentErrorToast(mensaje400);
            break;
          case 401:
          case 403:
            let mensaje401 = `[HTTP 404] Servidor no encontrado...`;
            mensaje401 = error.body ? error.body : mensaje401;
            this.presentErrorToast(mensaje401);
            this.storageService.clear();
            this.router.navigate(['/login']);
            break;
          case 404:
            let mensaje404 = `[HTTP 404] Servidor no encontrado...`;
            mensaje404 = error.body ? error.body : mensaje404;
            this.presentErrorToast(mensaje404);
            break;
          case 500:
            let mensaje500 = `[HTTP 500] Internal error...`;
            mensaje500 = error.body ? error.body : mensaje500;
            this.presentErrorToast(mensaje500);
            break;
          default:
            if (error) {
              this.presentErrorToast(`Sin conexion con el servidor`);
            }
            break;
        }
        this.removeRequest(req);
        return throwError(errorResponse);
      })
    );
  }

  /**
   * Agrega token a la cabecera
   * @param request = request genereado
   * @param token = token obtenido
   */
  private addToken(request: HttpRequest<any>, token: any): HttpRequest<any> {
    // Authentication by setting header with token value
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return request;
  }

  /**
   * Presenta el toast con mensaje
   * @param msg = mensaje a mostrar
   */
  async presentErrorToast(msg: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'top',
      color: 'warning',
      cssClass: 'toast',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }

  /**
   * Finaliza loading
   */
  async dismissLoading(): Promise<any> {
    this.loadingCtrl.getTop().then((hasLoading) => {
      if (hasLoading) {
        this.loadingCtrl.dismiss();
      }
    });
  }

  /**
   * Remueve request segun solicitud y valida si cero finalizamos loading
   * @param req = request generado
   */
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    setTimeout(() => {
      if (this.requests.length === 0) {
        this.dismissLoading();
      }
    }, 0);
  }
}
