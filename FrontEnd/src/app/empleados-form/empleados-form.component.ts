// Importamos las dependencias necesarias de Angular
import { Component, OnInit } from '@angular/core';  // Importa `Component` y `OnInit` para crear un componente y manejar el ciclo de vida del mismo
import { ActivatedRoute, Router } from '@angular/router';  // Importa `ActivatedRoute` para obtener los parámetros de la URL y `Router` para navegar entre rutas
import { EmpleadosService } from '../empleados.service';  // Importa el servicio de empleados que contiene la lógica para interactuar con el backend
import { CommonModule } from '@angular/common';  // Importa `CommonModule` para funcionalidades comunes como *ngFor y *ngIf
import { FormsModule } from '@angular/forms';  // Importa `FormsModule` para trabajar con formularios en Angular

// Decorador @Component define las características del componente
@Component({
  selector: 'app-empleados-form',  // Selector para este componente
  standalone: true,  // Hace que el componente sea autónomo
  imports: [CommonModule, FormsModule],  // Módulos importados para el componente: CommonModule y FormsModule
  templateUrl: './empleados-form.component.html',  // Archivo HTML que actúa como plantilla para este componente
  styleUrls: ['./empleados-form.component.css']  // Archivo CSS asociado con estilos para este componente
})
export class EmpleadosFormComponent implements OnInit {  // Definición de la clase que implementa OnInit para ejecutar código al iniciar el componente
  // Definimos una variable `empleado` para almacenar los datos del empleado en un objeto
  // El objeto tiene las propiedades que coinciden con los campos del formulario
  empleado: any = { nombre: '', apellido: '', cargo: '', fechaContratacion: '', departamento: '' };

  // `departamentos` es un array que se llenará con los departamentos disponibles obtenidos del backend
  departamentos: any[] = [];

  // `isEditing` indica si estamos editando un empleado existente o creando uno nuevo
  isEditing = false;

  // Constructor de la clase donde se inyectan los servicios necesarios
  constructor(
    private empleadosService: EmpleadosService,  // Inyectamos el servicio de empleados para hacer operaciones CRUD con el backend
    private route: ActivatedRoute,  // Inyectamos `ActivatedRoute` para obtener parámetros de la URL
    private router: Router  // Inyectamos `Router` para la navegación entre rutas
  ) {}

  // Este método es parte del ciclo de vida del componente y se ejecuta al iniciarse
  ngOnInit(): void {
    // Cargamos la lista de departamentos desde el backend al iniciar el componente
    this.empleadosService.getDepartamentos().subscribe(data => {
      // Asignamos los departamentos obtenidos al array `departamentos`
      this.departamentos = data;
    });

    // Obtenemos los datos del empleado desde los parámetros de la URL (si los hay)
    const empleadoData = this.route.snapshot.paramMap.get('empleado');
    
    // Si hay datos de empleado en la URL, significa que estamos editando un empleado existente
    if (empleadoData) {
      this.empleado = JSON.parse(empleadoData);  // Convertimos la cadena JSON en un objeto
      this.isEditing = true;  // Marcamos que estamos en modo de edición
    }
  }

  // Método que se ejecuta cuando el formulario es enviado
  onSubmit(): void {
    // Si estamos editando un empleado existente
    if (this.isEditing) {
      // Llamamos al servicio para actualizar el empleado con los datos actuales
      this.empleadosService.updateEmpleado(this.empleado.id, this.empleado).subscribe(() => {
        // Después de actualizar, redirigimos a la lista de empleados
        this.router.navigate(['/empleados']);
      }, error => {
        // En caso de error, lo mostramos en la consola
        console.error('Error al actualizar empleado:', error);
      });
    } else {
      // Si estamos agregando un nuevo empleado
      this.empleadosService.addEmpleado(this.empleado).subscribe(() => {
        // Después de agregar, redirigimos a la lista de empleados
        this.router.navigate(['/empleados']);
      }, error => {
        // En caso de error, lo mostramos en la consola
        console.error('Error al agregar empleado:', error);
      });
    }
  }
}
