import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HorariosService } from '../../../services/horarios.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-horarios-barbero',
  templateUrl: './horarios-barbero.component.html',
  styleUrls: ['./horarios-barbero.component.css'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class HorariosBarberoComponent implements OnInit {
  horarioForm: FormGroup;
  horarios: any[] = [];
  barberoId: number;
  username: string = 'admin';
  password: string = 'admin123';
  diasSemana: string[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO'];

  constructor(
    private fb: FormBuilder,
    private horariosService: HorariosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.horarioForm = this.fb.group({
      diasSemana: [[], Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });

    this.barberoId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.cargarHorarios();
  }

  cargarHorarios() {
    this.horariosService.obtenerHorariosBarbero(this.barberoId, this.username, this.password)
      .subscribe({
        next: (data) => {
          this.horarios = data;
        },
        error: (err) => {
          console.error('Error al cargar horarios:', err);
          alert('Error al cargar los horarios del barbero');
        }
      });
  }

  agregarHorario() {
    if (this.horarioForm.invalid) {
      this.horarioForm.markAllAsTouched();
      return;
    }

    const formValues = this.horarioForm.value;
    
    // Validar que se haya seleccionado al menos un día
    if (!formValues.diasSemana || formValues.diasSemana.length === 0) {
      alert('Debe seleccionar al menos un día de la semana');
      return;
    }

    // Crear un horario por cada día seleccionado
    const requests = formValues.diasSemana.map((dia: string) => {
      const horarioData = {
        idUsuarioBarbero: this.barberoId,
        diasSemana: dia,
        horaInicio: formValues.horaInicio,
        horaFin: formValues.horaFin
      };
      return this.horariosService.crearHorario(horarioData, this.username, this.password);
    });

    // Ejecutar todas las peticiones en paralelo
    forkJoin(requests).subscribe({
      next: () => {
        alert('Horarios agregados exitosamente');
        this.horarioForm.reset({
          diasSemana: [],
          horaInicio: '',
          horaFin: ''
        });
        this.cargarHorarios();
      },
      error: (err) => {
        console.error('Error al crear horarios:', err);
        alert('Error al crear los horarios');
      }
    });
  }

  inactivarHorario(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este horario?')) {
      this.horariosService.inactivarHorario(id, this.username, this.password)
        .subscribe({
          next: () => {
            alert('Horario eliminado exitosamente');
            this.cargarHorarios();
          },
          error: (err) => {
            console.error('Error al eliminar horario:', err);
            alert('Error al eliminar el horario');
          }
        });
    }
  }
} 