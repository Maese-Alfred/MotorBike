import { Component, inject } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateClientComponent } from '../../components/create-client/create-client.component';
import { CreateMotoComponent } from '../../components/create-moto/create-moto.component';
import { CreateMechanicComponent } from '../../components/create-mechanic/create-mechanic.component';
import { NgIf } from '@angular/common';

import { ClientService } from '../../services/client.service';


@Component({
  selector: 'app-client-register',
  imports: [NavBarComponent, CreateClientComponent,CreateMotoComponent,CreateMechanicComponent,NgIf],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  standalone: true,
})

export class ClientRegisterComponent {
  showMechanicForm = false;
  showClientForm = true; // Mostrar cliente por defecto
  clienteSeleccionado: any = {};
  motoSeleccionada: any = {};

  toggleMechanicForm() {
    this.showMechanicForm = true;
    this.showClientForm = false;
  }

  toggleClientForm() {
    this.showClientForm = true;
    this.showMechanicForm = false;
  }

  clientService =inject(ClientService);
  clientes: any[] = [];

  ngOnInit() {
    this.clientService.getAllClientes().subscribe((data) => {
      this.clientes = data;
    });
  }

  handleSubmit() {
  console.log('Cliente a enviar:', this.clienteSeleccionado);
  console.log('Moto a enviar:', this.motoSeleccionada);
  
  this.clientService.createClienteConMoto(this.clienteSeleccionado, this.motoSeleccionada).subscribe((response) => {
    console.log('Cliente creado:', response);
    this.clientes.push(response);
  });
}

}
