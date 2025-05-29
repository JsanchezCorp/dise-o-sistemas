import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = 'http://localhost:8081/api/horarios';

  constructor(private http: HttpClient) { }

  crearHorario(horarioData: any, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post(this.baseUrl, horarioData, { headers });
  }

  obtenerHorariosBarbero(barberoId: number, username: string, password: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<any[]>(`${this.baseUrl}/barbero/${barberoId}/activos`, { headers });
  }

  actualizarHorario(id: number, horarioData: any, username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put(`${this.baseUrl}/${id}`, horarioData, { headers });
  }

  inactivarHorario(id: number, username: string, password: string): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'ngrok-skip-browser-warning': 'true'
    });
    return this.http.patch<void>(`${this.baseUrl}/${id}/inactivar`, {}, { headers });
  }
} 