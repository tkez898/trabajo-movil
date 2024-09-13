import { Component } from '@angular/core';
import { Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public mostrar: boolean = false;

  usuario={
   'nombre':'',
   'contrasena':''
  }
  mensaje='';


  constructor(private router:Router) {}
  
  ingresar(){
    if(this.usuario.nombre.length !=0){
      if(this.usuario.contrasena.length !=0){
        this.mensaje='Ingresado Correctamente'

        let navigationExtras:NavigationExtras={
          state:{
            usuario:this.usuario.nombre,
            contrasena:this.usuario.contrasena,
          }
        }
        this.router.navigate(['/pagina2'], navigationExtras)
        this.mensaje=''

      }
      else {
        this.mensaje='No ingresa Contraseña'
      }
    } else {
        this.mensaje='No ingresa usuario'
    } 

  }

  olvido(){

  }
}
