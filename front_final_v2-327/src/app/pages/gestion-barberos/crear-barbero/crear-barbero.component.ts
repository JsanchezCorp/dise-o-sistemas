import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BarberosService } from '../../../services/barberos.service';

@Component({
  selector: 'app-crear-barbero',
  templateUrl: './crear-barbero.component.html',
  styleUrls: ['./crear-barbero.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class CrearBarberoComponent {
  barberoForm: FormGroup;
  username: string = 'admin';
  password: string = 'admin123';

  constructor(
    private fb: FormBuilder, 
    private barberosService: BarberosService, 
    private router: Router
  ) {
    this.barberoForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      persona: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        documento: ['', Validators.required],
        telefono: ['', Validators.required]
      })
    });
  }

  crearBarbero() {
    if (this.barberoForm.invalid) {
      this.barberoForm.markAllAsTouched();
      return;
    }

    this.barberosService.registrarBarbero(this.barberoForm.value, this.username, this.password)
      .subscribe({
        next: () => {
          alert('Barbero creado exitosamente');
          this.router.navigate(['/barberos']);
        },
        error: (err) => {
          console.error('Error al crear barbero', err);
          let errorMsg = 'Error al crear el barbero';
          
          if (err.status === 401) {
            errorMsg = 'No tiene permisos para crear barberos. Verifique que está autenticado como administrador.';
          } else if (err.status === 400) {
            errorMsg = 'Datos inválidos. Por favor verifique la información ingresada.';
          }
          
          alert(errorMsg);
        }
      });
  }
}

