import { Routes } from '@angular/router';  
// `Routes` es un tipo que representa la configuración de las rutas en Angular.

import { EmpleadosListadoComponent } from './empleados-listado/empleados-listado.component';  
// Importa el componente que muestra la lista de empleados.

import { EmpleadosFormComponent } from './empleados-form/empleados-form.component';  
// Importa el componente que muestra el formulario para agregar o editar empleados.

export const routes: Routes = [
  { path: 'empleados', component: EmpleadosListadoComponent },  
  // Ruta que muestra el componente `EmpleadosListadoComponent` cuando la URL es `/empleados`.

  { path: 'empleado-form', component: EmpleadosFormComponent },  
  // Ruta que muestra el componente `EmpleadosFormComponent` cuando la URL es `/empleado-form`.

  { path: '', redirectTo: '/empleados', pathMatch: 'full' }  
  // Ruta por defecto que redirige a `/empleados` cuando la URL es la raíz (`/`). 
  // El `pathMatch: 'full'` indica que solo se redirige si la URL coincide exactamente con la raíz.
];
