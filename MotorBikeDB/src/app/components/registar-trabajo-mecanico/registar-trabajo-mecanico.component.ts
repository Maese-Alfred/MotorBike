import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

import TrabajoMecanico from '../../../models/TrabajoMecanico';
import { TrabajoMecanicoService } from '../../services/trabajo-mecanico.service';

import Historial from '../../../models/Historial';
import { HistorialService } from '../../services/historial.service';

import Mecanico from '../../../models/Mecanico';
import { MecanicoService } from '../../services/mecanico.service';

@Component({
  selector: 'app-registar-trabajo-mecanico',
  imports: [FormsModule, NgFor],
  standalone: true,
  templateUrl: './registar-trabajo-mecanico.component.html',
  styleUrl: './registar-trabajo-mecanico.component.scss'
})

export class RegistarTrabajoMecanicoComponent implements OnInit {
   historiales: Historial[] = [];
  mecanicos: Mecanico[] = [];

  historialSeleccionado: number | null = null;
  mecanicoSeleccionado: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';
  descripcion: string = '';
  detallesAdicionales: string = '';

  constructor(
    private trabajoService: TrabajoMecanicoService,
    private historialService: HistorialService,
    private mecanicoService: MecanicoService
  ) {}

  ngOnInit(): void {
    this.cargarHistoriales();
    this.cargarMecanicos();
  }

  cargarHistoriales() {
    this.historialService.obtenerHistorialCompleto().subscribe(
      (data) => this.historiales = data,
      (error) => {
        console.error('Error al cargar historiales:', error);
        alert('No se pudieron cargar los historiales.');
      }
    );
  }

  cargarMecanicos() {
    this.mecanicoService.obtenerMecanicos().subscribe(
      (data) => this.mecanicos = data,
      (error) => {
        console.error('Error al cargar mecánicos:', error);
        alert('No se pudieron cargar los mecánicos.');
      }
    );
  }

  registrarTrabajo() {
    if (
      this.historialSeleccionado &&
      this.mecanicoSeleccionado &&
      this.fechaInicio &&
      this.fechaFin &&
      this.descripcion.trim() !== ''
    ) {
      const trabajo: TrabajoMecanico = {
        id_historial: this.historialSeleccionado,
        id_mecanico: this.mecanicoSeleccionado,
        fecha_inicio_servicio: this.fechaInicio,
        fecha_fin_servicio: this.fechaFin,
        descripcion_trabajo: this.descripcion,
        detalles_adicionales: this.detallesAdicionales
      };

      this.trabajoService.registrarTrabajoMecanico(trabajo).subscribe(
        (res) => {
          alert('Trabajo registrado correctamente');
          // Limpiar formulario
          this.historialSeleccionado = null;
          this.mecanicoSeleccionado = null;
          this.fechaInicio = '';
          this.fechaFin = '';
          this.descripcion = '';
          this.detallesAdicionales = '';
        },
        (error) => {
          console.error('Error al registrar trabajo:', error);
          alert('Error al registrar trabajo.');
        }
      );
    } else {
      alert('Complete todos los campos requeridos.');
    }
  }
  
}
