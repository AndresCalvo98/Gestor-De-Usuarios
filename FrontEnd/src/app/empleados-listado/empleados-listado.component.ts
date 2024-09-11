import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule

@Component({
  selector: 'app-empleados-listado',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de importar CommonModule
  templateUrl: './empleados-listado.component.html',
  styleUrls: ['./empleados-listado.component.css']
})
export class EmpleadosListadoComponent implements OnInit {
  empleados: any[] = [];
  departamentos: any[] = [];  // Lista de departamentos para mostrar el nombre

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpleados();
    this.getDepartamentos();  // Obtener también los departamentos al iniciar
  }

  // Obtener empleados desde el backend
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

  // Obtener departamentos desde el backend
  getDepartamentos(): void {
    this.empleadosService.getDepartamentos().subscribe(
      data => {
        this.departamentos = data;
      },
      error => {
        console.error('Error al obtener departamentos:', error);
      }
    );
  }

  // Función para obtener el nombre del departamento basado en su ID
  getDepartamentoNombre(departamentoId: number): string {
    const departamento = this.departamentos.find(dept => dept.id === departamentoId);
    return departamento ? departamento.nombre : 'Desconocido';  // Si no encuentra el departamento, muestra 'Desconocido'
  }

  // Eliminar empleado y actualizar la lista
  eliminarEmpleado(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmacion) {
      this.empleadosService.deleteEmpleado(id).subscribe(() => {
        console.log(`Empleado con ID ${id} eliminado`);
        this.getEmpleados();  // Refrescar la lista después de eliminar
      }, error => {
        console.error('Error al eliminar empleado:', error);
      });
    }
  }

  // Redirigir al formulario de edición de empleados
  editarEmpleado(empleado: any): void {
    this.router.navigate(['/empleado-form', { empleado: JSON.stringify(empleado) }]);
  }

  // Redirigir al formulario de agregar un nuevo empleado
  agregarEmpleado(): void {
    this.router.navigate(['/empleado-form']);  // Redirigir al formulario de agregar empleados
  }
}
