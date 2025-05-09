import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-check-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-appointment.component.html',
  styleUrl: './check-appointment.component.scss'
})
export class CheckAppointmentComponent implements OnInit {
  citas: any[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.citaService.obtenerCitasConDetalles().subscribe(citas => {
      this.citas = citas;
    });
  }

  handleConfirmarCita(id: number) {
    this.citaService.confirmarCita(id).subscribe(orden => {
      console.log('Orden creada:', orden);
      alert('Cita confirmada y orden de servicio creada.');
      // Recargar las citas después de confirmar una
      this.citaService.obtenerCitasConDetalles().subscribe(citas => {
        this.citas = citas;
      });
    });
  }
}