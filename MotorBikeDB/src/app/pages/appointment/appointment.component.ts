import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateAppointmentComponent } from '../../components/create-appointment/create-appointment.component';
import { CheckAppointmentComponent} from '../../components/check-appointment/check-appointment.component';
import { AssignMechanicComponent } from '../../components/assign-mechanic/assign-mechanic.component';

@Component({
  selector: 'app-appointment',
  imports: [NavBarComponent, CreateAppointmentComponent, CheckAppointmentComponent,AssignMechanicComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})

export class AppointmentComponent {

}
