import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';
import { ReservaService } from '../../../services/reserva.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  standalone: true,
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonButton
  ],
})
export class AgendarCitaComponent implements OnInit {
  fecha: string = '';
  hora: string = '';
  idServicio: number | null = null;
  idBarbero: number | null = null;

  horasDisponibles = ['09:00:00','10:00:00', '11:00:00','12:00:00', '14:00:00','15:00:00', '16:00:00','17:00:00','18:00:00'];
  servicios: any[] = [];
  barberos: any[] = [];
  currentUser: any;

  constructor(
    private servicioService: ServicioService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    this.cargarServicios();
    this.cargarBarberos();
  }

  cargarServicios() {
    this.servicioService.obtenerServiciosActivos(this.currentUser.username, this.currentUser.password)
      .subscribe({
        next: (data) => {
          this.servicios = data;
        },
        error: (error) => {
          console.error('Error al cargar servicios:', error);
          alert('Error al cargar los servicios disponibles');
        }
      });
  }

  cargarBarberos() {
    this.reservaService.obtenerBarberosActivos(this.currentUser.username, this.currentUser.password)
      .subscribe({
        next: (data) => {
          this.barberos = data;
        },
        error: (error) => {
          console.error('Error al cargar barberos:', error);
          alert('Error al cargar los barberos disponibles');
        }
      });
  }

  onFechaHoraChange() {
    if (this.fecha && this.hora && this.idBarbero) {
      const soloFecha = this.fecha.split('T')[0];
      const fechaHora = `${soloFecha}T${this.hora}`;

      this.reservaService.verificarDisponibilidadBarbero(
        this.idBarbero,
        fechaHora,
        this.currentUser.username,
        this.currentUser.password
      ).subscribe({
        next: (response) => {
          if (!response.disponible) {
            alert(`El barbero no está disponible en ese horario. Próximo horario disponible: ${new Date(response.siguienteDisponible).toLocaleString()}`);
            this.hora = '';
          }
        },
        error: (error) => {
          console.error('Error al verificar disponibilidad:', error);
          alert('Error al verificar la disponibilidad del barbero');
        }
      });
    }
  }

  confirmarCita(): void {
    if (!this.fecha || !this.hora || !this.idServicio || !this.idBarbero) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const soloFecha = this.fecha.split('T')[0];
    const fechaHora = `${soloFecha}T${this.hora}`;

    const payload = {
      idUsuarioCliente: this.currentUser.id,
      idServicio: this.idServicio,
      idUsuarioBarbero: this.idBarbero,
      fecha: fechaHora
    };

    this.reservaService.crearReserva(payload, this.currentUser.username, this.currentUser.password).subscribe({
      next: () => {
        alert('¡Cita agendada exitosamente!');
        this.router.navigate(['/mis-reservas']);
      },
      error: (error) => {
        console.error('Error al crear reserva:', error);
        alert('No fue posible agendar la cita: ' + (error.error?.message || 'Error desconocido'));
      }
    });
  }

  volver(): void {
    history.back();
  }
}

