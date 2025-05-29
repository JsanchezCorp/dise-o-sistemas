import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  // Crear una nueva categoría
  createCategoria(categoria: any, username: string, password: string): Observable<Categoria> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'ngrok-skip-browser-warning': 'true'
    });
    return this.http.post<Categoria>(`${this.apiUrl}/api/categoriaservicios`, categoria, { headers });
  }

  // Obtener una categoría por ID
  getCategoria(id: number, username: string, password: string): Observable<Categoria> {
    const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'ngrok-skip-browser-warning': 'true'
    });
    return this.http.get<Categoria>(`${this.apiUrl}/api/categoriaservicios/${id}`, { headers });
  }

  // Actualizar una categoría existente
  updateCategoria(id: number, categoria: any, username: string, password: string): Observable<Categoria> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${username}:${password}`),
        'ngrok-skip-browser-warning': 'true'
    });
    return this.http.put<Categoria>(`${this.apiUrl}/api/categoriaservicios/${id}`, categoria, { headers });
  }
}