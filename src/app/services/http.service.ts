import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

// Interface
import { IHttp } from '../interfaces/IHttp';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements IHttp {
  authState = new BehaviorSubject(false);
  constructor(private storage: Storage, private router: Router) {}

  Get(ruta: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  Post(ruta: string, body: Object): Observable<any> {
    throw new Error('Method not implemented.');
  }

  Put(ruta: string, body: Object): Observable<any> {
    throw new Error('Method not implemented.');
  }
  Delete(ruta: string, id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
