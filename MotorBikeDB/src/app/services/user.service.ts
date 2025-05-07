import { Injectable } from '@angular/core';
import User from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User[];

  constructor() { 
    this.user = [
      {
        email: '',
        nombre: '',
        apellido: '',
        password: '',
        id_rol: 0,
  }]
}
}
