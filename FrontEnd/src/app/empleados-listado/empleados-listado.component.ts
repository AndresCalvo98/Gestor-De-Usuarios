import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-empleados-listado',
  standalone: true,
  imports: [CommonModule],  // No necesitas HttpClientModule aquí
  templateUrl: './empleados-listado.component.html',
  styleUrls: ['./empleados-listado.component.css']
})
export class EmpleadosListadoComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(
      data => {
        console.log('Datos obtenidos del backend:', data);
        this.empleados = data;
      },
      error => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  editarEmpleado(empleado: any): void {
    console.log('Editando empleado:', empleado);
  }

  eliminarEmpleado(id: number): void {
    this.empleadosService.deleteEmpleado(id).subscribe(() => {
      console.log(`Empleado con ID ${id} eliminado`);
      this.getEmpleados();
    }, error => {
      console.error('Error al eliminar empleado:', error);
    });
  }
}
