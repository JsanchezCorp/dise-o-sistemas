import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../../../services/reserva.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  barberos: any[] = [];
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.reservaForm = this.fb.group({
      idUsuarioBarbero: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });

    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    this.cargarBarberos();
  }

  cargarBarberos() {
    this.reservaService.obtenerBarberosActivos(this.currentUser.username, this.currentUser.password)
      .subscribe({
        next: (data) => {
          this.barberos = data;
        },
        error: (err) => {
          console.error('Error al cargar barberos:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar la lista de barberos'
          });
        }
      });
  }

  crearReserva() {
    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
      return;
    }

    const formValues = this.reservaForm.value;
    const fechaHora = new Date(formValues.fecha + 'T' + formValues.hora);
    
    // Verificar disponibilidad del barbero
    this.reservaService.verificarDisponibilidadBarbero(
      formValues.idUsuarioBarbero,
      fechaHora.toISOString(),
      this.currentUser.username,
      this.currentUser.password
    ).subscribe({
      next: (response) => {
        if (response.disponible) {
          // Si está disponible, crear la reserva
          const reservaData = {
            idUsuarioCliente: this.currentUser.id,
            idUsuarioBarbero: formValues.idUsuarioBarbero,
            fecha: fechaHora.toISOString(),
            idServicio: 1 // ID del servicio "corte chebere"
          };

          this.reservaService.crearReserva(reservaData, this.currentUser.username, this.currentUser.password)
            .subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: '¡Éxito!',
                  text: 'Reserva creada exitosamente'
                });
                this.router.navigate(['/mis-reservas']);
              },
              error: (err) => {
                console.error('Error al crear reserva:', err);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Error al crear la reserva: ' + (err.error?.message || 'Error desconocido')
                });
              }
            });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No disponible',
            text: 'El barbero no está disponible en ese horario. Próximo horario disponible: ' + 
                  new Date(response.siguienteDisponible).toLocaleString()
          });
        }
      },
      error: (err) => {
        console.error('Error al verificar disponibilidad:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al verificar disponibilidad: ' + (err.error?.message || 'Error desconocido')
        });
      }
    });
  }
} 