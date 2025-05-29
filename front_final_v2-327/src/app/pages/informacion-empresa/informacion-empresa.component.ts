import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacion-empresa',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule,
    HttpClientModule
  ],
  templateUrl: './informacion-empresa.component.html',
  styleUrls: ['./informacion-empresa.component.scss']
})
export class InformacionEmpresaComponent implements OnInit {
  horarios: string = '';
  ubicacion: string = '';
  ciudad: string = '';
  currentUser: any;

  constructor(
    private empresaService: EmpresaService,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.cargarInformacion();
  }

  cargarInformacion() {
    if (!this.currentUser) return;

    this.empresaService.obtenerInformacion(this.currentUser.username, this.currentUser.password)
      .subscribe({
        next: (data) => {
          if (data) {
            this.horarios = data.horarios || '';
            this.ubicacion = data.ubicacion || '';
            this.ciudad = data.ciudad || '';
          }
        }
      });
  }

  guardarInformacion() {
    const data = {
      horarios: this.horarios || '8:00am a 1pm y de 3:00pm a 7:00pm',
      ubicacion: this.ubicacion || 'Calle 8 No. 32 - 49',
      ciudad: this.ciudad || 'Neiva - Huila'
    };

    this.empresaService.actualizarInformacion(data, this.currentUser.username, this.currentUser.password)
      .subscribe({
        next: (response) => {
          if (response) {
            this.horarios = response.horarios;
            this.ubicacion = response.ubicacion;
            this.ciudad = response.ciudad;
          }
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Información actualizada',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  }

  volver() {
    this.navCtrl.navigateRoot('/view-admin');
  }
}
