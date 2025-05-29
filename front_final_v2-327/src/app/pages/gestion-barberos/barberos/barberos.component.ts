import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { BarberosService } from '../../../services/barberos.service';

@Component({
  selector: 'app-barberos',
  templateUrl: './barberos.component.html',
  styleUrls: ['./barberos.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink]
})
export class BarberosComponent implements OnInit {
  barberos: any[] = [];
  username: string = 'admin';
  password: string = 'admin123';

  constructor(
    private barberosService: BarberosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarBarberos();
  }

  cargarBarberos() {
    this.barberosService.obtenerBarberos(this.username, this.password)
      .subscribe({
        next: (data) => {
          this.barberos = data;
        },
        error: (err: Error) => {
          console.error('Error al cargar barberos:', err);
          alert('Error al cargar la lista de barberos');
        }
      });
  }

  eliminarBarbero(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este barbero?')) {
      this.barberosService.eliminarBarbero(id, this.username, this.password)
        .subscribe({
          next: () => {
            alert('Barbero eliminado exitosamente');
            this.cargarBarberos();
          },
          error: (err: Error) => {
            console.error('Error al eliminar barbero:', err);
            alert('Error al eliminar el barbero');
          }
        });
    }
  }
}