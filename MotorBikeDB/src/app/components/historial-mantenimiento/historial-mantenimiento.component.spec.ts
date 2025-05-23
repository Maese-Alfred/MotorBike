import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMantenimientoComponent } from './historial-mantenimiento.component';

describe('HistorialMantenimientoComponent', () => {
  let component: HistorialMantenimientoComponent;
  let fixture: ComponentFixture<HistorialMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialMantenimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
