import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-empleados-listado',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './empleados-listado.component.html',
  styleUrls: ['./empleados-listado.component.css']
})
export class EmpleadosListadoComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(
      data => {
        this.empleados = data;
      },
      error => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  editarEmpleado(empleado: any): void {
    this.router.navigate(['/empleado-form', { empleado: JSON.stringify(empleado) }]);
  }

  eliminarEmpleado(id: number): void {
    this.empleadosService.deleteEmpleado(id).subscribe(() => {
      this.getEmpleados();  // Refrescar la lista después de eliminar
    }, error => {
      console.error('Error al eliminar empleado:', error);
    });
  }

  agregarEmpleado(): void {
    this.router.navigate(['/empleado-form']);
  }
}
