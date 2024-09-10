import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosListadoComponent } from './empleados-listado.component';

describe('EmpleadosListadoComponent', () => {
  let component: EmpleadosListadoComponent;
  let fixture: ComponentFixture<EmpleadosListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosListadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
