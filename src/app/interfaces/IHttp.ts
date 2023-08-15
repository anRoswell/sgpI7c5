import { Observable } from 'rxjs';

export interface IHttp {
  Get(ruta: string): Observable<any>;
  Post(ruta: string, body: Object): Observable<any>;
  Put(ruta: string, body: Object): Observable<any>;
  Delete(ruta: string, id: number): Observable<any>;
}
