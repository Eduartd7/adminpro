import { Component, OnInit } from '@angular/core';
//servicio
import {TipoUsuarioService} from '../tipo-usuario.service';
//models
import {tipoUsuario} from '../models/tipoUsuario';
//ritas
import {Router, ActivatedRoute} from '@angular/router';
//alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-tipo-usuario',
  templateUrl: './mod-tipo-usuario.component.html',
  styleUrls: ['./mod-tipo-usuario.component.css']
})
export class ModTipoUsuarioComponent implements OnInit {
  
  tipUM:tipoUsuario={
    'nombre':'',
    'descripcion': ''
  }
  ids;
  tipUser:any;
  constructor(private service:TipoUsuarioService, private router:Router, private activateRouter:ActivatedRoute) { }

  ngOnInit() {
    //sesion
    var session = localStorage.getItem('x-access-token');
    if(session == null){
      this.router.navigate(['../login'])
    }  
    //cachar id del registro
    var id = this.activateRouter.snapshot.paramMap.get('id');
    this.ids = id;
     
    //get id registro
      this.service.getIdtipoUsuario(this.ids)
      .subscribe(tipUs =>{
      this.tipUser = tipUs;
    });
  }
  mod(){
   Swal.fire({
      title: '¿Dese modificar el registro?',
      text: "El registro se modificará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.service.putTipoUsuario(this.tipUser.tipoUsuario._id, this.tipUM) 
        .subscribe(
          res => {
          },
          err => console.log(err)
        )
        Swal.fire(
          'Modificado!',
          'El registro se modificó correctamente.',
          'success'
        )
      this.router.navigate(['/tipoUsuario']);
      }
    });
 }
}
