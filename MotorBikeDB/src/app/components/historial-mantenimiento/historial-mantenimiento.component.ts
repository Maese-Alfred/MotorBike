import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';
import  Historial  from '../../../models/Historial';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-historial-mantenimiento',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './historial-mantenimiento.component.html',
  styleUrl: './historial-mantenimiento.component.scss'
})
export class HistorialMantenimientoComponent implements OnInit {
  historiales: Historial[] = [];

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }
  cargarHistorial() {
    this.historialService.obtenerHistorialCompleto().subscribe(historiales => {
      this.historiales = historiales;
    }, error => {
      console.error('Error al cargar el historial:', error);
      alert('Error al cargar el historial. Por favor, inténtelo de nuevo más tarde.');
    } 
    );  
  } 

}
