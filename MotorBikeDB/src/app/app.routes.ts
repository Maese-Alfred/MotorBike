import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ClientRegisterComponent } from './pages/client-register/client-register.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { HistorialComponent } from './pages/historial/historial.component';


export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'client-register', component: ClientRegisterComponent},
    {path: 'turnos', component: AppointmentComponent},
    {path: 'historial', component: HistorialComponent}   
];
