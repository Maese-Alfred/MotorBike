import { NgIf } from '@angular/common';
import { Component,Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [NgIf,RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  @Output() toggleMechanicForm = new EventEmitter<void>();

  @Output() toggleClientForm = new EventEmitter<void>();

  get isClientRegisterRoute(): boolean {
    return window.location.pathname === '/client-register';
  }

  onClickMechanic() {
    this.toggleMechanicForm.emit();
  }

  onClickClient() {
    this.toggleClientForm.emit();
  }
}
