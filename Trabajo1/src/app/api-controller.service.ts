import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerUsuario(): Observable<any> {
    return this.http.get(this.apiURL + '/usuarios');
  }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiURL + '/usuarios', usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/usuarios/${id}`);
  }
}
