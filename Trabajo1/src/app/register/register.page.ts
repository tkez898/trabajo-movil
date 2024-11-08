import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiControllerService } from '../api-controller.service';

interface Usuario {
  username: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public usuario = {
    nombre: '',
    contrasena: '',
    confirmacion: ''
  };
  public mensaje = '';

  constructor(private api: ApiControllerService, private router: Router) {}

  registrar() {
    if (this.usuario.nombre.length === 0 || this.usuario.contrasena.length === 0 || this.usuario.confirmacion.length === 0) {
      this.mensaje = 'Todos los campos son obligatorios';
      return;
    }
  
    if (this.usuario.contrasena !== this.usuario.confirmacion) {
      this.mensaje = 'Las contraseñas no coinciden';
      return;
    }
  

    this.api.obtenerUsuario().subscribe((usuarios: Usuario[]) => {
      const existe = usuarios.find(user => user.username === this.usuario.nombre);
      if (existe) {
        this.mensaje = 'El usuario ya existe';
      } else {

        const nuevoUsuario = { username: this.usuario.nombre, password: this.usuario.contrasena };
        this.api.agregarUsuario(nuevoUsuario).subscribe(() => {
          this.mensaje = 'Se ha registrado exitosamente';
          this.router.navigate(['/home']);
        }, (error) => {
          this.mensaje = 'Error al registrar el usuario';
          console.error('Error al registrar:', error);
        });
      }
    }, (error) => {
      this.mensaje = 'Error al obtener usuarios';
      console.error('Error al obtener usuarios:', error);
    });
  }
}  
