import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cita from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})

export class CitaService {
  private apiUrl = 'http://localhost:3000/api/citas'; // Cambia esto a la URL de tu API
  constructor(private http: HttpClient) { }

  crearCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }
  
  obtenerCitasConDetalles(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  confirmarCita(id: number): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, { confirmado: true });
  }
}
