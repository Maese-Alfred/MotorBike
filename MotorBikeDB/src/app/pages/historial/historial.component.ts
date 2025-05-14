import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { HistorialMantenimientoComponent } from '../../components/historial-mantenimiento/historial-mantenimiento.component';
import { RegistrarHistorialComponent } from '../../components/registrar-historial/registrar-historial.component';
import { HistorialPorMecanicoComponent } from '../../components/historial-por-mecanico/historial-por-mecanico.component';

@Component({
  selector: 'app-historial',
  imports: [NavBarComponent,HistorialMantenimientoComponent,RegistrarHistorialComponent,HistorialPorMecanicoComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

}
