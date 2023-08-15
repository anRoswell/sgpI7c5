import { Observable } from 'rxjs';

export interface IAuthenticate {
  getData(): Observable<any>;
  login$(credentials: any): Observable<any>;
  crearConectado$(usuario: any): Observable<any>;
  logout(): void;
  getSesionActiva$(): void;
}
