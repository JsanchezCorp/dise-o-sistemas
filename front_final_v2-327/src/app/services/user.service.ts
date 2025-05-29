import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../pages/info-user/user';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private baseUrl = 'http://localhost:8081/api/';

    constructor(private http: HttpClient) { }

    obtenerUsuarioPorId(
        id: number,
        username: string,
        password: string
    ): Observable<Usuario> {
        const url = `${this.baseUrl}usuarios/${id}`;
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'ngrok-skip-browser-warning': 'true'
        });
        return this.http.get<Usuario>(url, { headers });
    }

    actualizarUsuario(
        id: number,
        usuario: Usuario,
        username: string,
        password: string
    ): Observable<Usuario> {
        const url = `${this.baseUrl}usuarios/${id}`;
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        });
        return this.http.put<Usuario>(url, usuario, { headers });
    }

    // aquí podrías agregar más métodos (actualizarUsuario, etc.)
}