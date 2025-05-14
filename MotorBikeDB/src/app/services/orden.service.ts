import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Orden from '../../models/Orden';



@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  readonly apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  obtenerOrdenes(): Observable<Orden[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ordenes`);
  }

  actualizarEstado(id_orden:number, nuevoEstado:Orden) : Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ordenes/${id_orden}`, { estado: nuevoEstado });
  }

  obtenerOrdenesCompletas(): Observable<Orden[]> {
    return this.http.get<Orden[]>(`${this.apiUrl}/ordenes/completadas`);
  }
}
