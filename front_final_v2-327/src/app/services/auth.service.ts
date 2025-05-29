import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

export interface LoginResponse {
  id: number;
  username: string;
  message: string;
  roles: string[];
}

export interface CurrentUser {
  id: number;
  username: string;
  password: string;
  roles: string[];
}

const API_URL = 'http://localhost:8081/api/usuarios';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = environment.loginUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  storeUserData(response: LoginResponse, password: string): void {
    localStorage.setItem('userId', response.id.toString());
    localStorage.setItem('username', response.username);
    localStorage.setItem('password', password); // Almacenamos la contraseña para las llamadas API
    localStorage.setItem('roles', JSON.stringify(response.roles));
  }

  getCurrentUser(): CurrentUser | null {
    const id = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const roles = this.getRoles();

    if (!id || !username || !password) {
      return null;
    }

    return {
      id: parseInt(id),
      username,
      password,
      roles
    };
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getRole(): string {
    return this.getRoles()[0]; // Si solo tienes un rol por usuario
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  isBarbero(): boolean {
    return this.getRole() === 'ROLE_BARBERO';
  }

  isCliente(): boolean {
    return this.getRole() === 'ROLE_CLIENTE';
  }

  logout(): void {
    localStorage.clear();
  }

  registrarCliente(data: any): Observable<any> {
    return this.http.post('http://localhost:8081/api/usuarios/registrar/cliente', data);
  }
}