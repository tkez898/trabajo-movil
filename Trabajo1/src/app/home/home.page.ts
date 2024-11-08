import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiControllerService } from '../api-controller.service';

interface Usuario {
  id: number;
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario = {
    username: '',
    password: ''
  };

  mensaje = '';

  constructor(private router: Router, private api: ApiControllerService) {}

  ingresar() {
    console.log('Intentando ingresar con usuario:', this.usuario.username);
  
    if (this.usuario.username.length > 0) {
      if (this.usuario.password.length > 0) {
        this.api.obtenerUsuario().subscribe(
          (usuarios: Usuario[]) => {
            console.log('Usuarios recuperados:', usuarios);
  
            const userFound = usuarios.find(
              (user: Usuario) =>
                user.username === this.usuario.username &&
                user.password === this.usuario.password
            );
  
            if (userFound) {
              console.log('Usuario encontrado:', userFound);
              this.mensaje = 'Ingresado Correctamente';
  
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('usuario', this.usuario.username);
  
              let navigationExtras: NavigationExtras = {
                state: { usuario: this.usuario.username }
              };
  
              this.router.navigate(['/pagina2'], navigationExtras);
            } else {
              console.log('Usuario o contraseña incorrectos.');
              this.mensaje = 'Usuario o contraseña incorrectos o no registrado';
            }
          },
          (error) => {
            console.log('ERROR en la llamada a la API:', error);
            this.mensaje = 'Error al validar las credenciales';
          }
        );
      } else {
        this.mensaje = 'No se ingresó una contraseña.';
        console.log('No se ingresó una contraseña.');
      }
    } else {
      this.mensaje = 'No se ingresó un usuario.';
      console.log('No se ingresó un usuario.');
    }
  }
  


  olvido() {
    if (this.usuario.username.length > 0) {
      let navigationExtras: NavigationExtras = {
        state: {
          usuario: this.usuario.username,
          contrasena: this.usuario.password,
        }
      };
      this.router.navigate(['/pagina3'], navigationExtras);
      this.mensaje = '';
    } else {
      this.mensaje = 'No se ingresó un usuario';
    }
  }
}
