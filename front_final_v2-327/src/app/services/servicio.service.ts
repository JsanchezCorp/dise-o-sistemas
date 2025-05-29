import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../interfaces/servicio.interface';

@Injectable({
    providedIn: 'root'
})
export class ServicioService {
    private baseUrl = 'http://localhost:8081/api/';

    constructor(private http: HttpClient) { }

    private getAuthHeaders(username: string, password: string): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'ngrok-skip-browser-warning': 'true'
        });
    }

    crearServicio(data: any, username: string, password: string): Observable<Servicio> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.post<Servicio>(`${this.baseUrl}servicios`, data, { headers });
    }

    obtenerCategoriasActivas(username: string, password: string): Observable<any[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<any[]>(`${this.baseUrl}categoriaservicios/activos`, { headers });
    }

    obtenerServiciosActivos(username: string, password: string): Observable<Servicio[]> {
        const headers = this.getAuthHeaders(username, password);
        return this.http.get<Servicio[]>(`${this.baseUrl}servicios/activos`, { headers });
    }

    actualizarServicioTarifa(id: number, data: any, username: string, password: string): Observable<Servicio> {
        const headers = this.getAuthHeaders(username, password);
        if (data.precio) {
            data.precio = Number(data.precio);
        }
        return this.http.put<Servicio>(`${this.baseUrl}servicios/${id}`, data, { headers });
    }
}