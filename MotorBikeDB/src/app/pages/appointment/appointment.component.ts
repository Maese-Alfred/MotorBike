import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateAppointmentComponent } from '../../components/create-appointment/create-appointment.component';
import { CheckAppointmentComponent} from '../../components/check-appointment/check-appointment.component';
import { AssignMechanicComponent } from '../../components/assign-mechanic/assign-mechanic.component';
import { RegistarTrabajoMecanicoComponent } from '../../components/registar-trabajo-mecanico/registar-trabajo-mecanico.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-appointment',
  imports: [NavBarComponent, CreateAppointmentComponent, CheckAppointmentComponent,AssignMechanicComponent,RegistarTrabajoMecanicoComponent,NgIf],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})

export class AppointmentComponent {
    showCreate = false;
  showCheck = false;
  showAssign = false;
  showRegister = false;

  toggleComponent(component: string) {
    switch (component) {
      case 'create':
        this.showCreate = !this.showCreate;
        break;
      case 'check':
        this.showCheck = !this.showCheck;
        break;
      case 'assign':
        this.showAssign = !this.showAssign;
        break;
      case 'register':
        this.showRegister = !this.showRegister;
        break;
    }
  }

}
