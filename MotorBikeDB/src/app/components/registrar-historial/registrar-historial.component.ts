import { Component, OnInit } from '@angular/core';
import  Historial  from '../../../models/Historial';
import { HistorialService } from '../../services/historial.service';
import { OrdenService } from '../../services/orden.service'; 
import Orden from '../../../models/Orden';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-registrar-historial',
  imports: [FormsModule,NgFor],
  templateUrl: './registrar-historial.component.html',
  styleUrl: './registrar-historial.component.scss'
})
export class RegistrarHistorialComponent implements OnInit {
historiales: Historial[] = [];
ordenes: Orden[] = [];
ordenSeleccionada: number | null = null;
detallesHistorial: string = '';

constructor(
  private historialService: HistorialService,
  private ordenService: OrdenService
) {}

 ngOnInit(): void {
    this.cargarOrdenes();
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historialService.obtenerHistorialCompleto().subscribe(
      historiales => this.historiales = historiales,
      error => {
        console.error('Error al cargar el historial:', error);
        alert('Error al cargar el historial. Por favor, inténtelo de nuevo más tarde.');
      }
    );
  }

  cargarOrdenes() {
    this.ordenService.obtenerOrdenesCompletas().subscribe(
      ordenes => this.ordenes = ordenes,
      error => {
        console.error('Error al cargar las órdenes:', error);
        alert('Error al cargar las órdenes. Por favor, inténtelo de nuevo más tarde.');
      }
    );
  }

  registrarHistorialMantenimiento(historial: Historial) {
    if (this.ordenSeleccionada !== null) {
      this.historialService.registrarHistorialMantenimiento(this.ordenSeleccionada, historial).subscribe(
        nuevoHistorial => {
          console.log('Historial registrado:', nuevoHistorial);
          alert('Historial registrado exitosamente.');
          this.cargarHistorial();
          this.detallesHistorial = '';
          this.ordenSeleccionada = null;
        },
        error => {
          console.error('Error al registrar el historial:', error);
          alert('Error al registrar el historial. Por favor, inténtelo de nuevo más tarde.');
        }
      );
    } else {
      alert('Por favor, seleccione una orden antes de registrar el historial.');
    }
  }

  handleSubmit() {
    if (this.ordenSeleccionada !== null && this.detallesHistorial.trim() !== '') {
      const historial: Historial = {
        id_orden: this.ordenSeleccionada,
        fecha_historial: '', // si el backend la autogenera, puedes dejarla vacía
        detalles_historial: this.detallesHistorial,
      };
      this.registrarHistorialMantenimiento(historial);
    } else {
      alert('Por favor, seleccione una orden y escriba los detalles.');
    }
  }
}
