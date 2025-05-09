import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Mecanico from '../../models/Mecanico';

@Injectable({
  providedIn: 'root'
})

export class MecanicoService {

  readonly apiUrl = 'http://localhost:3000/api/mecanicos';

constructor(private http: HttpClient) {}
  
crearMecanico(mecanico: Mecanico): Observable<Mecanico> {
    return this.http.post<Mecanico>(this.apiUrl, mecanico);
  }

  obtenerMecanicos(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(this.apiUrl);
  }

  eliminarMecanico(nombre_mecanico: string): Observable<Mecanico> {
    return this.http.delete<Mecanico>(`${this.apiUrl}/${nombre_mecanico}`);
  }

  actualizarMecanico(mecanico: Mecanico): Observable<Mecanico> {
    return this.http.put<Mecanico>(`${this.apiUrl}/${mecanico.nombre_mecanico}`, mecanico);
  }

}
