import { Component } from '@angular/core';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateAppointmentComponent } from '../../components/create-appointment/create-appointment.component';

@Component({
  selector: 'app-appointment',
  imports: [NavBarComponent,CreateAppointmentComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

}
