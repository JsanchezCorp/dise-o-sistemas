import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservaService {
    private baseUrl = 'http://localhost:8081/api/reservas';
    private usuariosUrl = 'http://localhost:8081/api/usuarios';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(username: string, password: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        });
    }

    crearReserva(data: any, username: string, password: string): Observable<any> {
        const headers = this.getAuthHeaders(username, password);
        console.log('Enviando reserva con datos:', data);
        return this.http.post(this.baseUrl, data, { headers });
    }

    obtenerBarberosActivos(username: string, password: string): Observable<any[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any[]>(`${this.usuariosUrl}/barberos/activos`, { headers });
    }

    obtenerBarberosDisponibles(fecha: string, username: string, password: string): Observable<any[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any[]>(`${this.usuariosUrl}/barberos/disponibles`, {
            headers,
            params: { fecha }
        });
    }

    verificarDisponibilidadBarbero(barberoId: number, fecha: string, username: string, password: string): Observable<any> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any>(`${this.baseUrl}/barbero/${barberoId}/disponibilidad`, {
            headers,
            params: { fecha }
        });
    }

    eliminarReserva(reservaId: number, username: string, password: string): Observable<any> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.delete(`${this.baseUrl}/${reservaId}`, { headers });
    }

    obtenerMisReservasActivas(username: string, password: string): Observable<any[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any[]>(`${this.baseUrl}/mis-reservas/activas`, { headers });
    }

    obtenerTodasLasReservas(username: string, password: string): Observable<any[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any[]>(`${this.baseUrl}/todas`, { headers });
    }
}
