import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = `${environment.apiUrl}/informacion-empresa`;

  constructor(private http: HttpClient) { }

  actualizarInformacion(data: any, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password))
      .set('Content-Type', 'application/json');

    return this.http.put(`${this.apiUrl}`, data, { headers });
  }

  obtenerInformacion(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password))
      .set('Content-Type', 'application/json');

    return this.http.get(`${this.apiUrl}`, { headers });
  }
} 