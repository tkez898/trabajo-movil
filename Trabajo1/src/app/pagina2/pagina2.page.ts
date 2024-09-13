import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-pagina2',
  templateUrl: './pagina2.page.html',
  styleUrls: ['./pagina2.page.scss'],
})
export class Pagina2Page implements OnInit {

usuario=''
  
  constructor(private router:Router) {
    const navegacion=this.router.getCurrentNavigation()
    const state=navegacion?.extras.state as {
      usuario:''
      contrasena:''
    }
    this.usuario=state.usuario
  }

  


  ngOnInit() {
  }

}
