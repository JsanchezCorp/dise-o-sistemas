import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../interfaces/categoria.interface';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  private baseUrl = 'http://localhost:8081/api/';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin123'),
      'ngrok-skip-browser-warning': 'true'
    });

    this.http.get<Categoria[]>(`${this.baseUrl}categoriaservicios`, { headers })
      .subscribe({
        next: (data) => {
          this.categorias = data;
        },
        error: (error) => {
          console.error('Error al cargar categorías:', error);
        }
      });
  }

  editarCategoria(id: number): void {
    this.router.navigate(['/editar-categoria', id]);
  }

  crearCategoria(): void {
    this.router.navigate(['/crear-categoria']);
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123'),
        'ngrok-skip-browser-warning': 'true'
      });
      const options = { headers };

      this.http.patch(`${this.baseUrl}categoriaservicios/${id}/inactivar`, {}, options).subscribe({
        next: () => {
          console.log('Categoría inactivada correctamente');
          alert('Categoría eliminada exitosamente');
          this.cargarCategorias();
        },
        error: (error) => {
          console.error('Error al intentar inactivar la categoría:', error);
          
          if (error.status === 0) {
            alert('Error de conexión con el servidor. Por favor, verifica tu conexión a internet.');
          } else if (error.status === 500) {
            alert('Error en el servidor. Por favor, inténtalo de nuevo más tarde.');
          } else {
            alert('No se pudo inactivar la categoría. Por favor, inténtalo de nuevo.');
          }
        }
      });
    }
  }
}