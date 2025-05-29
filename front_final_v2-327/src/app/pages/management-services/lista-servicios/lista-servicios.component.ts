import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../../services/servicio.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Servicio } from '../../../interfaces/servicio.interface';

@Component({
  selector: 'app-lista-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-servicios.component.html',
  styleUrls: ['./lista-servicios.component.scss']
})
export class ListaServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  currentUser: any;

  constructor(
    private servicioService: ServicioService, 
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {
    this.cargarServicios();
  }

  cargarServicios(): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    this.servicioService.obtenerServiciosActivos(this.currentUser.username, this.currentUser.password).subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios); // Para debug
      },
      error: (err) => {
        console.error('Error al obtener servicios:', err);
        alert('No se pudieron cargar los servicios.');
      }
    });
  }

  crearNuevoServicio() {
    this.router.navigate(['/crear-servicio']);
  }

  volver() {
    history.back();
  }
}
