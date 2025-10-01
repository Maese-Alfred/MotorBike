import { Component, OnInit } from '@angular/core';
import { HistorialService } from '../../services/historial.service';
import Historial from '../../../models/Historial';
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
  paginatedHistoriales: Historial[] = [];


  pageSize: number = 5;
  currentPage: number = 1;

  constructor(private historialService: HistorialService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.historialService.obtenerHistorialCompleto().subscribe(
      historiales => {
        this.historiales = historiales;
        this.updatePaginatedHistoriales();
      },
      error => {
        console.error('Error al cargar el historial:', error);
        alert('Error al cargar el historial. Por favor, inténtelo de nuevo más tarde.');
      }
    );
  }

  updatePaginatedHistoriales() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHistoriales = this.historiales.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedHistoriales();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedHistoriales();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.historiales.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedHistoriales();
  }
}