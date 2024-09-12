// Importamos las dependencias necesarias de Angular
import { Component, OnInit } from '@angular/core';  // Importamos `Component` para definir el componente y `OnInit` para manejar el ciclo de vida del mismo
import { ActivatedRoute, Router } from '@angular/router';  // `ActivatedRoute` se utiliza para acceder a los parámetros de la URL, `Router` para redirigir
import { EmpleadosService } from '../empleados.service';  // Importamos el servicio que maneja la lógica de interacción con el backend (empleados y departamentos)
import { CommonModule } from '@angular/common';  // Importa `CommonModule` para funcionalidades comunes de Angular como directivas (*ngFor, *ngIf)
import { FormsModule } from '@angular/forms';  // Importamos `FormsModule` para trabajar con formularios

// Definición del decorador @Component que identifica el componente y sus propiedades
@Component({
  selector: 'app-empleados-form',  // Selector HTML que identifica este componente en el DOM
  standalone: true,  // Hace que el componente funcione de manera independiente (standalone)
  imports: [CommonModule, FormsModule],  // Especificamos los módulos que el componente utilizará, en este caso para manejar formularios y directivas comunes
  templateUrl: './empleados-form.component.html',  // La ruta del archivo de la plantilla HTML
  styleUrls: ['./empleados-form.component.css']  // La ruta del archivo CSS que contiene los estilos del componente
})
export class EmpleadosFormComponent implements OnInit {  // Definimos la clase `EmpleadosFormComponent` que implementa `OnInit`

  // Definimos una propiedad `empleado` que representa el objeto empleado que se va a crear o editar
  empleado: any = { nombre: '', apellido: '', cargo: '', fechaContratacion: '', departamento: '' };

  // Creamos un array `departamentos` que contendrá la lista de departamentos disponibles
  departamentos: any[] = [];

  // `isEditing` es un booleano que indica si estamos en modo de edición (true) o creación de empleado (false)
  isEditing = false;

  // Inyectamos los servicios necesarios a través del constructor para usarlos en este componente
  constructor(
    private empleadosService: EmpleadosService,  // Servicio para interactuar con la API y gestionar los empleados
    private route: ActivatedRoute,  // `ActivatedRoute` nos permite obtener los parámetros de la URL
    private router: Router  // `Router` nos permite redirigir al usuario entre rutas
  ) {}

  // Ciclo de vida de Angular: el método `ngOnInit` se ejecuta cuando el componente ha sido inicializado
  ngOnInit(): void {
    // Llamamos al servicio para obtener la lista de departamentos y llenamos el array `departamentos` cuando los datos están listos
    this.empleadosService.getDepartamentos().subscribe(data => {
      this.departamentos = data;  // Asignamos los datos recibidos a la propiedad `departamentos`
    });

    // Obtenemos los datos del empleado desde los parámetros de la URL (si existe, significa que estamos en modo de edición)
    const empleadoData = this.route.snapshot.paramMap.get('empleado');
    
    // Si `empleadoData` existe (estamos editando), lo convertimos de JSON a objeto y asignamos a la propiedad `empleado`
    if (empleadoData) {
      this.empleado = JSON.parse(empleadoData);  // Convertimos el string JSON a un objeto
      this.isEditing = true;  // Establecemos `isEditing` en true para indicar que estamos editando un empleado existente
    }
  }

  // Método que se ejecuta cuando el formulario se envía
  onSubmit(): void {
    // Si estamos en modo de edición (`isEditing` es verdadero)
    if (this.isEditing) {
      // Llamamos al servicio para actualizar el empleado existente con la nueva información
      this.empleadosService.updateEmpleado(this.empleado.id, this.empleado).subscribe(() => {
        // Si la actualización es exitosa, redirigimos a la página de listado de empleados
        this.router.navigate(['/empleados']);
      }, error => {
        // Si hay un error, lo imprimimos en la consola
        console.error('Error al actualizar empleado:', error);
      });
    } else {
      // Si estamos en modo de creación (no estamos editando)
      this.empleadosService.addEmpleado(this.empleado).subscribe(() => {
        // Si la creación es exitosa, redirigimos a la página de listado de empleados
        this.router.navigate(['/empleados']);
      }, error => {
        // Si hay un error al agregar, lo imprimimos en la consola
        console.error('Error al agregar empleado:', error);
      });
    }
  }
}