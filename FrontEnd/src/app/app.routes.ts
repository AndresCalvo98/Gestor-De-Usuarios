import { Routes } from '@angular/router';
import { EmpleadosListadoComponent } from './empleados-listado/empleados-listado.component';
import { EmpleadosFormComponent } from './empleados-form/empleados-form.component';  // Nombre correcto

export const routes: Routes = [
  { path: 'empleados', component: EmpleadosListadoComponent },  // Listado de empleados
  { path: 'empleado-form', component: EmpleadosFormComponent },  // Formulario para agregar o editar empleados
  { path: '', redirectTo: '/empleados', pathMatch: 'full' }  // Redirección por defecto
];
