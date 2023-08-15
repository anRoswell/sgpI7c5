import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IHttp {
  Get(ruta: string): Observable<any>;
  GetParams(ruta: string, params: HttpParams): Observable<any>;
  Post(ruta: string, body: Object): Observable<any>;
  Put(ruta: string, body: Object): Observable<any>;
  Delete(ruta: string, id: number): Observable<any>;
}
