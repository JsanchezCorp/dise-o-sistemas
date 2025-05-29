import { Pipe, PipeTransform } from '@angular/core';
import { Servicio } from '../interfaces/servicio.interface';

@Pipe({
  name: 'servicioNombre',
  standalone: true
})
export class ServicioNombrePipe implements PipeTransform {
  transform(servicios: Servicio[], id: number): string {
    const servicio = servicios.find(s => s.id === id);
    return servicio ? servicio.nombre : 'Servicio no encontrado';
  }
} 