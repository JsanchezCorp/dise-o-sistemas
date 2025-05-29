import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicioService } from '../../../services/servicio.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Servicio } from '../../../interfaces/servicio.interface';
import { 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
  NavController
} from '@ionic/angular/standalone';
import { ServicioNombrePipe } from '../../../pipes/servicio-nombre.pipe';
import { CategoriaNombrePipe } from '../../../pipes/categoria-nombre.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-tarifas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonModal,
    ServicioNombrePipe,
    CategoriaNombrePipe
  ],
  template: `
    <ion-content>
      <div class="container">
        <div class="top-bar">
          <button class="back-button" (click)="volver()">←</button>
          <h2>Actualizar Servicio</h2>
        </div>

        <ion-list>
          <ion-item>
            <ion-label position="stacked">Servicio</ion-label>
            <ion-button expand="full" fill="outline" (click)="servicioModal.present()">
              {{ servicioSeleccionado ? (servicios | servicioNombre:servicioSeleccionado) : 'Seleccione un servicio' }}
            </ion-button>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Nombre</ion-label>
            <ion-input type="text" [(ngModel)]="nombre" name="nombre"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Descripción</ion-label>
            <ion-input type="text" [(ngModel)]="descripcion" name="descripcion"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Precio</ion-label>
            <ion-input type="number" [(ngModel)]="precio" name="precio" placeholder="Ej: 25000" [step]="1000" [min]="0"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Categoría</ion-label>
            <ion-button expand="full" fill="outline" (click)="categoriaModal.present()">
              {{ idCategoriaServicio ? (categorias | categoriaNombre:idCategoriaServicio) : 'Seleccione una categoría' }}
            </ion-button>
          </ion-item>
        </ion-list>

        <ion-button expand="block" class="actualizar-btn" (click)="actualizarServicio()">
          Actualizar
        </ion-button>
      </div>
    </ion-content>

    <!-- Modal para selección de servicio -->
    <ion-modal #servicioModal>
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Seleccionar Servicio</ion-title>
            <ion-button slot="end" (click)="servicioModal.dismiss()">Cerrar</ion-button>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item *ngFor="let s of servicios" (click)="seleccionarServicio(s.id); servicioModal.dismiss()">
              <ion-label>{{ s.nombre }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>

    <!-- Modal para selección de categoría -->
    <ion-modal #categoriaModal>
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-title>Seleccionar Categoría</ion-title>
            <ion-button slot="end" (click)="categoriaModal.dismiss()">Cerrar</ion-button>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item *ngFor="let c of categorias" (click)="seleccionarCategoria(c.id); categoriaModal.dismiss()">
              <ion-label>{{ c.nombre }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: [`
    .container {
      padding: 20px;
      background-color: #ffffff;
      min-height: 100vh;
      font-family: 'Arial', sans-serif;
    }

    .top-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .back-button {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
    }

    ion-item {
      --padding-start: 0;
      --padding-end: 0;
      --inner-padding-end: 0;
      margin-bottom: 16px;
    }

    ion-button.actualizar-btn {
      --background: #f1b700;
      --color: #000;
      --border-radius: 20px;
      margin-top: 30px;
      height: 50px;
      font-weight: bold;
    }

    ion-button.actualizar-btn:hover {
      --background: #e0a800;
    }

    ion-modal ion-toolbar {
      --background: #f1b700;
      --color: #000;
    }

    ion-item {
      cursor: pointer;
    }

    ion-item:hover {
      --background: #f5f5f5;
    }
  `]
})
export class ActualizarTarifasComponent implements OnInit {
  @ViewChild('servicioModal') servicioModal!: IonModal;
  @ViewChild('categoriaModal') categoriaModal!: IonModal;

  servicios: Servicio[] = [];
  categorias: any[] = [];
  currentUser: any;

  servicioSeleccionado: any = null;
  nombre: string = '';
  descripcion: string = '';
  precio: number | null = null;
  idCategoriaServicio: number | null = null;

  constructor(
    private servicioService: ServicioService,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit(): void {
    this.cargarServicios();
    this.cargarCategorias();
  }

  cargarServicios(): void {
    if (!this.currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }

    this.servicioService.obtenerServiciosActivos(this.currentUser.username, this.currentUser.password).subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (err) => {
        console.error('Error al obtener servicios:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los servicios.'
        });
      }
    });
  }

  cargarCategorias(): void {
    this.servicioService.obtenerCategoriasActivas(this.currentUser.username, this.currentUser.password).subscribe({
      next: (data) => this.categorias = data,
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cargar categorías'
        });
      }
    });
  }

  seleccionarServicio(id: number): void {
    const servicio = this.servicios.find(s => s.id === id);
    if (servicio) {
      this.servicioSeleccionado = servicio.id;
      this.nombre = servicio.nombre;
      this.descripcion = servicio.descripcion;
      this.precio = servicio.precio;
      this.idCategoriaServicio = servicio.categoriaServicio?.id || null;
    }
  }

  seleccionarCategoria(id: number): void {
    this.idCategoriaServicio = id;
  }

  actualizarServicio(): void {
    if (!this.servicioSeleccionado || !this.nombre || !this.descripcion || !this.precio || !this.idCategoriaServicio) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor complete todos los campos'
      });
      return;
    }

    const payload = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      idCategoriaServicio: this.idCategoriaServicio
    };

    this.servicioService.actualizarServicioTarifa(
      this.servicioSeleccionado, 
      payload, 
      this.currentUser.username, 
      this.currentUser.password
    ).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Servicio actualizado exitosamente',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          // Navegar a la página de gestión de tarifas
          this.navCtrl.navigateRoot('/servicios');
        });
      },
      error: (err) => {
        console.error('Error al actualizar servicio:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el servicio.'
        });
      }
    });
  }

  limpiarFormulario(): void {
    this.servicioSeleccionado = null;
    this.nombre = '';
    this.descripcion = '';
    this.precio = null;
    this.idCategoriaServicio = null;
  }

  volver(): void {
    this.navCtrl.navigateRoot('/view-admin');
  }
}
