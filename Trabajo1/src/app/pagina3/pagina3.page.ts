import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-pagina3',
  templateUrl: './pagina3.page.html',
  styleUrls: ['./pagina3.page.scss'],
})
export class Pagina3Page implements OnInit {

usuario=''
  
  constructor(private router:Router) {
    const navegacion=this.router.getCurrentNavigation()
    const state=navegacion?.extras.state as {
      usuario:''
      contrasena:''
    }
    this.usuario=state.usuario
  }

  
  terminar(){
        this.router.navigate(['/home'])
    }
  

  ngOnInit() {
  }

}

