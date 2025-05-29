import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../../interfaces/categoria.interface';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditarCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;
  categoriaId: number = 0;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoriaId = +params['id'];
        this.cargarCategoria();
      }
    });
  }

  cargarCategoria(): void {
    const username = 'admin';
    const password = 'admin123';

    this.categoriasService.getCategoria(this.categoriaId, username, password)
      .subscribe({
        next: (categoria) => {
          this.categoriaForm.patchValue({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion
          });
        },
        error: (error) => {
          console.error('Error al cargar la categoría:', error);
          this.router.navigate(['/categoria']);
        }
      });
  }

  guardar(): void {
    if (this.categoriaForm.valid) {
      const username = 'admin';
      const password = 'admin123';

      const categoriaActualizada = {
        nombre: this.categoriaForm.value.nombre,
        descripcion: this.categoriaForm.value.descripcion
      };

      this.categoriasService.updateCategoria(this.categoriaId, categoriaActualizada, username, password)
        .subscribe({
          next: () => {
            console.log('Categoría actualizada exitosamente');
            this.router.navigate(['/categoria']);
          },
          error: (error) => {
            console.error('Error al actualizar la categoría:', error);
          }
        });
    }
  }
}