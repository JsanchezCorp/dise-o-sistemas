import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BarberosService {
    // Ajusta aquí tu baseUrl (puede salir de environment.ts)
    private baseUrl = 'http://localhost:8081/api/';

    constructor(private http: HttpClient) { }

    registrarBarbero(barberoData: any,username: string, password: string): Observable<any> {
        const url = `${this.baseUrl}usuarios/registrar/barbero`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            // ngrok-free pide a veces este header para evitar la advertencia en el navegador
            'ngrok-skip-browser-warning': 'true'
        });
        return this.http.post(url, barberoData, { headers });
    }

    obtenerBarberos(username: string, password: string): Observable<any[]> {
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'ngrok-skip-browser-warning': 'true'
        });
        return this.http.get<any[]>(`${this.baseUrl}usuarios/barberos/activos`, { headers });
    }

    eliminarBarbero(id: number, username: string, password: string): Observable<void> {
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'ngrok-skip-browser-warning': 'true'
        });
        return this.http.patch<void>(`${this.baseUrl}usuarios/${id}/inactivar`, {}, { headers });
    }
}