import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistarTrabajoMecanicoComponent } from './registar-trabajo-mecanico.component';

describe('RegistarTrabajoMecanicoComponent', () => {
  let component: RegistarTrabajoMecanicoComponent;
  let fixture: ComponentFixture<RegistarTrabajoMecanicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistarTrabajoMecanicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistarTrabajoMecanicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
