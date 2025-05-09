import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { MotoService } from '../../services/moto.service';
import { ServicioService } from '../../services/servicio.service'; 
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-create-appointment',
  imports: [NgFor,FormsModule],
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.scss'
})
export class CreateAppointmentComponent implements OnInit {
  clientes: any[] = [];
  servicios: any[] = [];
  motosClienteSeleccionado: any[] = [];

  cita = {
    cedula_cliente: '',
    placa_moto: '',
    id_servicio: null,
    fecha: '',
    hora: '',
    fecha_Cita: '' 
  };

  constructor(
    private clientesService: ClientService,
    private motosService: MotoService,
    private serviciosService: ServicioService, 
    private CitaService: CitaService
  ) {}

  ngOnInit() {
    this.clientesService.getAllClientes().subscribe(clientes => {
      this.clientes = clientes;
    });

    this.serviciosService.obtenerServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  filtrarMotos(cedula: string) {
    this.motosService.obtenerMotosPorCliente(cedula).subscribe(motos => {
      this.motosClienteSeleccionado = motos;
      this.cita.placa_moto = '';
    });
  }

  resetForm() {
    this.cita = {
      cedula_cliente: '',
      placa_moto: '',
      id_servicio: null,
      fecha: '',
      hora: '',
      fecha_Cita: '' 
    };
    this.motosClienteSeleccionado = [];
    this.clientes = []; 
  }

  handleSubmit() {
    // Validar que se haya seleccionado un servicio
    if (this.cita.id_servicio === null || isNaN(this.cita.id_servicio)) {
      alert('Debe seleccionar un servicio antes de continuar.');
      return;
    }
  
    // Construir la fecha completa
    this.cita.fecha_Cita = `${this.cita.fecha}T${this.cita.hora}`;
  
    // Crear el objeto que coincide con el modelo Cita
    const turnoFinal = {
      cedula_cliente: this.cita.cedula_cliente,
      placa_moto: this.cita.placa_moto,
      id_servicio: this.cita.id_servicio,
      fecha_cita: this.cita.fecha_Cita // asegúrate de que tu backend use esta propiedad
    };
  
    console.log('Turno a guardar:', turnoFinal);
  
    // Enviar la cita al servicio
    this.CitaService.crearCita(turnoFinal).subscribe(
      response => {
        console.log('Cita creada:', response);
        alert('Cita creada con éxito!');
        this.resetForm();
      },
      error => {
        console.error('Error al crear la cita:', error);
        alert('Ocurrió un error al crear la cita.');
      }
    );
  }
}
