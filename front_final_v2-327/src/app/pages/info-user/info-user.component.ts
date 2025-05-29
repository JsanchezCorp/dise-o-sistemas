// src/app/pages/info-user/info-user.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from './user';
import { UsuarioService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-info-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  usuario: Usuario = new Usuario();
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    this.usuarioService
      .obtenerUsuarioPorId(
        this.currentUser.id,
        this.currentUser.username,
        this.currentUser.password
      )
      .subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar usuario', err);
          alert('No se pudo cargar la información del usuario.');
        }
      });
  }

  guardarCambios() {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    // Validaciones básicas
    if (!this.usuario.persona.nombre || !this.usuario.persona.apellido || 
        !this.usuario.persona.documento || !this.usuario.persona.telefono) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    this.usuarioService
      .actualizarUsuario(
        this.currentUser.id,
        this.usuario,
        this.currentUser.username,
        this.currentUser.password
      )
      .subscribe({
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'La información se actualizó correctamente'
          });
          // Actualizar la información en el localStorage si es necesario
          if (data.username !== this.currentUser.username) {
            this.authService.storeUserData({
              id: data.id || this.currentUser.id,
              username: data.username,
              message: 'Usuario actualizado',
              roles: this.currentUser.roles
            }, this.currentUser.password);
          }
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar la información del usuario'
          });
        }
      });
  }

  volver() {
    history.back();
  }
}