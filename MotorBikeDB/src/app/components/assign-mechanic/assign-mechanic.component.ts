import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MecanicoService } from '../../services/mecanico.service';
import { OrdenService } from '../../services/orden.service';
import  Orden  from '../../../models/Orden'; // Importa el modelo Orden
import  Mecanico  from '../../../models/Mecanico'; // Importa el modelo Mecanico
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-assign-mechanic',
  imports: [FormsModule,NgFor],
  templateUrl: './assign-mechanic.component.html',
  styleUrl: './assign-mechanic.component.scss'
})
export class AssignMechanicComponent implements OnInit {
  ordenes: Orden[] = []; 
  mecanicos: Mecanico[] = [];

  ordenSeleccionada: number | null = null;
  mecanicoSeleccionado: number | null = null;

  constructor(private mecanicoService: MecanicoService, private ordenService: OrdenService) {}

  ngOnInit() {
    this.obtenerOrdenes();
    this.obtenerMecanicos();
  }

  obtenerOrdenes() {
    this.ordenService.obtenerOrdenes().subscribe(ordenes => {
      this.ordenes = ordenes;
    });
  }
  obtenerMecanicos(){
    this.mecanicoService.obtenerMecanicos().subscribe(mecanicos => {
      this.mecanicos = mecanicos;
    });
  }

  asignarMecanico() {
    if (this.ordenSeleccionada && this.mecanicoSeleccionado) {
      this.mecanicoService.asignarMecanico(this.ordenSeleccionada, this.mecanicoSeleccionado)
        .subscribe(
          response => {
            console.log('Mecanico asignado:', response);
            this.obtenerOrdenes();
          },
          error => {
            console.error('Error al asignar mecanico:', error);
          }
        );
    } else {
      console.error('Por favor selecciona una orden y un mecanico.');
    }
  }
}