import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';

// Environment
import { environment } from '../../environments/environment';

// Service
import { IAuthenticate } from '../interfaces/IAuthenticate';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService implements IAuthenticate {
  // Evento de control de sesion
  private sesionActiva$ = new BehaviorSubject<boolean>(false);

  url = environment.urlServer + 'auth/login';

  httpOptions = {
    params: new HttpParams().append('', ''),
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  urlTest = 'https://jsonplaceholder.typicode.com/users';
  private TIME_INTERVAL = 300000;

  constructor(
    private http: HttpClient,
    private router: Router //private sideMenuService: SideMenuService,
  ) {}

  updatePassword(idUser: string, password: string): Observable<any> {
    return this.http.put(`passmbusers/${idUser}`, { usrPassword: password });
  }

  getData(): Observable<any> {
    const req = new HttpRequest('GET', this.urlTest, {
      reportProgress: true,
    });

    return this.http.request(req);
  }

  // login$(credentials: any): Observable<any> {
  //   return this.http.post<any>(this.url, credentials, this.httpOptions).pipe(
  //     map((resp) => {
  //       resp = resp.datos;
  //       console.log(resp);

  //       if (resp) {
  //         sessionStorage.setItem('currentUser', JSON.stringify(resp));
  //       }
  //       //this.sideMenuService.getMenuOpts();

  //       this.router.navigate(['/home']);
  //       return resp;
  //     })
  //   );
  // }

  login$(credentials: any): Observable<any> {
    return this.http.post<any>(this.url, credentials, this.httpOptions).pipe(
      tap((resp) => {
        if (resp) {
          sessionStorage.setItem('currentUser', JSON.stringify(resp));
        }

        of(resp);
      })
    );
  }

  crearConectado$(usuario: any) {
    return this.http.post<any>(
      environment.urlServer + 'Sesiones/CrearConectado',
      usuario,
      this.httpOptions
    );
  }

  public logout() {
    sessionStorage.removeItem('currentUser');
    // window.location.replace('/login');
    this.router.navigate(['/']);
  }

  public get currentUserValue() {
    return JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  }
  getSesionActiva$() {
    return this.sesionActiva$.asObservable();
  }
}
