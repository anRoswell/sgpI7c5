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

  constructor(private router: Router, private http: HttpClient) {}

  Get(ruta: string): Observable<any> {
    throw new Error('Method not implemented.');
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
    const APIREST = `${this.urlServer}${endPoint})`;
    return this.http
      .post<any>(`${APIREST}`, JSON.stringify(body), this.httpOptions)
      .pipe(tap((resp) => of(resp)));
  }

  Put(ruta: string, body: Object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  Delete(ruta: string, id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
