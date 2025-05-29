import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonList, IonItem, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

interface Reserva {
  id: number;
  usuario: {
    id: number;
    username: string;
    persona: {
      nombre: string;
      apellido: string;
    };
  };
  barbero: {
    id: number;
    username: string;
    persona: {
      nombre: string;
      apellido: string;
    };
  };
  servicio: {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
  };
  fecha: string;
  estado: string;
}

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonButton, IonIcon],
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.scss']
})
export class ListaReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  currentUser: any;

  constructor(
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ trashOutline });
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    this.reservaService.obtenerMisReservasActivas(
      this.currentUser.username,
      this.currentUser.password
    ).subscribe({
      next: (data: Reserva[]) => {
        this.reservas = data;
        console.log('Reservas cargadas:', this.reservas);
      },
      error: (error: any) => {
        console.error('Error al cargar reservas:', error);
        alert('Error al cargar las reservas');
      }
    });
  }

  cancelarReserva(id: number): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    const confirmar = window.confirm('¿Está seguro de que desea cancelar esta reserva?');
    if (!confirmar) return;

    this.reservaService.eliminarReserva(
      id,
      this.currentUser.username,
      this.currentUser.password
    ).subscribe({
      next: () => {
        alert('Reserva cancelada exitosamente');
        this.cargarReservas();
      },
      error: (error: any) => {
        console.error('Error al cancelar reserva:', error);
        alert('Error al cancelar la reserva');
      }
    });
  }

  volver(): void {
    history.back();
  }
}