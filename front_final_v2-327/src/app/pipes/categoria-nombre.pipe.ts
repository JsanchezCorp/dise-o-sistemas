import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoriaNombre',
  standalone: true
})
export class CategoriaNombrePipe implements PipeTransform {
  transform(categorias: any[], id: number): string {
    const categoria = categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Categoría no encontrada';
  }
} 