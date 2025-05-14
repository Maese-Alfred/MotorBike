import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import TrabajoMecanico from '../../../models/TrabajoMecanico';
import { TrabajoMecanicoService } from '../../services/trabajo-mecanico.service';

@Component({
  selector: 'app-historial-por-mecanico',
  imports: [NgFor, NgIf, FormsModule],
  standalone: true,
  templateUrl: './historial-por-mecanico.component.html',
  styleUrl: './historial-por-mecanico.component.scss'
})
export class HistorialPorMecanicoComponent {
  idMecanico: number | null = null;
  trabajos: TrabajoMecanico[] = [];
  buscado: boolean = false;

  constructor(private trabajoService: TrabajoMecanicoService) {}

  buscarHistorialPorMecanico() {
    if (this.idMecanico === null) {
      alert('Por favor, ingrese un ID de mecánico válido.');
      return;
    }

    this.trabajoService.obtenerHistorialPorMecanico(this.idMecanico).subscribe({
      next: (trabajos) => {
        this.trabajos = trabajos;
        this.buscado = true;
      },
      error: (error) => {
        console.error('Error al obtener trabajos:', error);
        alert('Error al obtener el historial. Intente nuevamente.');
        this.trabajos = [];
        this.buscado = true;
      }
    });
  }
}
