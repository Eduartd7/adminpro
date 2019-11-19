import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import {publicaciones, comentarios} from '../models/publicaciones';
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
 API_URI = 'https://desempla2.herokuapp.com/api';

  httpheaders:any;
  id:any;  
  constructor(private http:HttpClient) {
    this.id = localStorage.getItem('session');
    var session = localStorage.getItem('x-access-token');
    this.httpheaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': session
  });
 }
 //crear publicaciones 
 postPublicaciones(publi:publicaciones){
   return this.http.post(`${this.API_URI}/publicaciones`, publi , {headers: this.httpheaders} );
 }
 //
 //traer publicaciones 
 getPublicaciones(){
  return this.http.get(`${this.API_URI}/publicaciones`, {headers: this.httpheaders} );
 }
 //
 //Traer usuario log 
  getIDUser(){
    return this.http.get(`${this.API_URI}/usuario/${this.id}`, {headers: this.httpheaders})
 }
 //obtener servicios 
 getServicios(){
   return this.http.get(`${this.API_URI}/servicio`, {headers: this.httpheaders})
 }
 getIDServicio(id:string){
 return this.http.get(`${this.API_URI}/publicacioneServicio/${id}`,{headers: this.httpheaders})
 }
 postComentarios(Comentarios:comentarios){
  return this.http.post(`${this.API_URI}/comentarios`, Comentarios, {headers: this.httpheaders} );
 }
 getComentarios(id:string){
  return this.http.get(`${this.API_URI}/comentarios/${id}`, {headers: this.httpheaders});
 }
 getIDComentarios(id:string){
  return this.http.get(`${this.API_URI}/comentario/${id}`, {headers: this.httpheaders});
 }
 deleteComentarios(id:string){
  return this.http.delete(`${this.API_URI}/comentarios/${id}`, {headers: this.httpheaders});
 }
 puComentario(id:string, Comentarios:comentarios){
  return this.http.put(`${this.API_URI}/comentarios/${id}`, Comentarios, {headers: this.httpheaders});  
 }
}