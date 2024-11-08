import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.page.html',
  styleUrls: ['./pagina3.page.scss'],
})
export class Pagina3Page implements OnInit {

  usuario: string = '';

  constructor(private router: Router) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as { usuario: string, contrasena: string };

    if (state && state.usuario) {
      this.usuario = state.usuario;
    } else {

      console.warn('No se ha encontrado información de usuario.');
      this.usuario = 'Usuario no identificado';
    }
  }

  terminar() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {}
}
