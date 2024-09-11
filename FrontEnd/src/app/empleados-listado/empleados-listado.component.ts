import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { forkJoin } from 'rxjs';  // Importa forkJoin para manejar múltiples observables

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
    // Cargar empleados y departamentos al iniciar el componente
    this.cargarEmpleadosYDepartamentos();
  }

  // Función para cargar empleados y departamentos
  cargarEmpleadosYDepartamentos(): void {
    forkJoin({
      empleados: this.empleadosService.getEmpleados(),
      departamentos: this.empleadosService.getDepartamentos()
    }).subscribe(
      result => {
        this.empleados = result.empleados;
        this.departamentos = result.departamentos;
        console.log('Empleados:', this.empleados);
        console.log('Departamentos:', this.departamentos);
      },
      error => {
        console.error('Error al cargar empleados y departamentos:', error);
      }
    );
  }

  // Función para obtener el nombre del departamento basado en su ID
  getDepartamentoNombre(departamentoId: number): string {
    const departamento = this.departamentos.find(dept => dept.id === departamentoId);
    return departamento ? departamento.nombre : 'Desconocido';
  }

  // Eliminar empleado y actualizar la lista
  eliminarEmpleado(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este empleado?');
    if (confirmacion) {
      this.empleadosService.deleteEmpleado(id).subscribe(() => {
        console.log(`Empleado con ID ${id} eliminado`);
        this.cargarEmpleadosYDepartamentos();  // Recargar empleados y departamentos después de eliminar
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
    this.router.navigate(['/empleado-form']).then(() => {
      this.cargarEmpleadosYDepartamentos(); // Asegúrate de recargar empleados y departamentos después de agregar
    });
  }
}
