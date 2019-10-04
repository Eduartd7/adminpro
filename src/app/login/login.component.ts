import { Component, OnInit } from '@angular/core';
import {userLog, user} from '../pages/usuario/models/usuario';
import {serviceUser} from '../services/usuario.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  ngOnInit() {
   localStorage.removeItem('x-access-token');
   localStorage.removeItem('session');
  }
  userLog:userLog={
    'Correo':"",
    'Password':"",
  }
  datos:any;
  private currentUserSubject: BehaviorSubject<user>;
  constructor(private service:serviceUser, private route:Router) {
    this.currentUserSubject = new BehaviorSubject<user>(JSON.parse(localStorage.getItem('x-access-token')));
   }
  log(){
    if(this.userLog.Correo != '' && this.userLog.Password != ''){
    this.service.logUser(this.userLog)
    .subscribe(user=>{
      this.datos = user;
      console.log(this.datos);

      if(this.datos.data != null){
        Swal.fire(
          'Usuario valido',
          'Bienvenido',
          'success'
        )
        localStorage.setItem('x-access-token', this.datos.data.token);
        localStorage.setItem('session', this.datos.data.Usuario);
        this.currentUserSubject.next(this.datos.data.token);
        if(this.datos.data.Rol.nombre == 'Admin'){
          this.route.navigate(['/menu']);
        }
        else if( this.datos.data.Rol.nombre == 'Cliente')
          this.route.navigate(['/inicio'])
        }
        else{
          Swal.fire(
            'Error',
            'Usuario verificar los datos ingresados',
            'warning'
          )
           }
         }
       )
     }
    else{
      Swal.fire(
        'Error',
        'Todos lo datos son requeridos',
        'warning'
      )
  }
 }
}
