import { Routes } from '@angular/router';
import { EmpleadosListadoComponent } from './empleados-listado/empleados-listado.component';  // Importa tu componente

// Definimos las rutas de la aplicación
export const routes: Routes = [
  { path: 'empleados', component: EmpleadosListadoComponent },  // Ruta para mostrar la tabla de empleados
  { path: '', redirectTo: '/empleados', pathMatch: 'full' }      // Redirección por defecto a la tabla de empleados
];
