import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Interface
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IHttp } from '../interfaces/IHttp';

// Environment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements IHttp {
  authState = new BehaviorSubject(false);
  urlServer = environment.urlServer;
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  Get(endPoint: string): Observable<any> {
    const APIREST = `${this.urlServer}${endPoint}`;
    return this.http.get<any>(APIREST, this.httpOptions).pipe(
      tap((resp) => {
        of(resp);
      })
    );
  }

  GetParams(endPoint: string, params: HttpParams): Observable<any> {
    const APIREST = `${this.urlServer}${endPoint}`;
    return this.http
      .get<any>(APIREST, { params, headers: this.httpOptions.headers })
      .pipe(
        tap((resp) => {
          of(resp);
        })
      );
  }

  Post(endPoint: string, body: Object): Observable<any> {
    const APIREST = `${this.urlServer}${endPoint}`;
    return this.http
      .post<any>(`${APIREST}`, JSON.stringify(body), this.httpOptions)
      .pipe(tap((resp) => of(resp)));
  }

  /**
   *
   * @param body data
   * @param rutaApi url del backend
   * @param opcion data a enviar
   * @returns
   */
  Put(endPoint: string, body: Object) {
    const APIREST = `${this.urlServer}${endPoint}`;
    return this.http
      .put(APIREST, body, this.httpOptions)
      .pipe(tap((data) => of(data)));
  }

  Delete(ruta: string, id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
