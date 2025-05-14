import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHistorialComponent } from './registrar-historial.component';

describe('RegistrarHistorialComponent', () => {
  let component: RegistrarHistorialComponent;
  let fixture: ComponentFixture<RegistrarHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
