import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiControllerService } from '../api-controller.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {
  usuario = {
    id: 0,
    nombre: ''
  };
  mensajeEliminar = '';

  constructor(
    private router: Router,
    private api: ApiControllerService,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['usuario']) {
      this.usuario.nombre = state['usuario'];
    }

    if (this.usuario.nombre) {
      this.api.obtenerUsuario().subscribe(
        (usuarios: any[]) => {
          const userFound = usuarios.find((user) => user.username === this.usuario.nombre);
          if (userFound) {
            this.usuario.id = userFound.id;
          } else {
            console.error('Usuario no encontrado');
            this.mensajeEliminar = 'No se ha encontrado el usuario';
          }
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
          this.mensajeEliminar = 'Error al intentar obtener el usuario';
        }
      );
    }
  }

  async confirmarEliminarCuenta() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarCuenta();
          }
        }
      ]
    });

    await alert.present();
  }

  eliminarCuenta() {
    if (this.usuario.id !== 0) {
      this.api.eliminarUsuario(this.usuario.id).subscribe(
        (response) => {
          this.mensajeEliminar = 'Cuenta eliminada correctamente';
          this.mostrarAlertaExito();
        },
        (error) => {
          this.mensajeEliminar = 'Error al eliminar la cuenta';
          console.error('Error eliminando la cuenta:', error);
        }
      );
    } else {
      this.mensajeEliminar = 'No se ha encontrado un usuario válido';
    }
  }

  async mostrarAlertaExito() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'La cuenta ha sido eliminada correctamente.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.redirigirAInicio();
          }
        }
      ]
    });

    await alert.present();
  }
  redirigirAInicio() {
    console.log('Redirigiendo a la página de inicio...');
    this.router.navigate(['/home']);
  }
}
