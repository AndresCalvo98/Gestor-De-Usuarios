import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empleados-form',
  standalone: true,
  imports: [],
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})
export class EmpleadosFormComponent implements OnInit {
  empleado = {
    nombre: '',
    apellido: '',
    cargo: '',
    fechaContratacion: '',
    departamento: ''
  };

  departamentos = ['TI', 'Marketing', 'Finanzas'];

  constructor() {}

  ngOnInit(): void {}

  guardarEmpleado(): void {
    console.log('Empleado guardado:', this.empleado);
  }
}
