import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';  
// `ApplicationConfig` es la interfaz para definir la configuración de la aplicación.
// `provideZoneChangeDetection` es un método para optimizar la detección de cambios en Angular, en este caso, fusionando eventos.

import { provideRouter } from '@angular/router';  
// `provideRouter` es un proveedor que configura el enrutamiento en la aplicación.

import { provideHttpClient } from '@angular/common/http';  
// `provideHttpClient` configura y proporciona el servicio de HttpClient, necesario para manejar solicitudes HTTP en la aplicación.

import { routes } from './app.routes';  
// Importa las rutas definidas en el archivo `app.routes.ts`. Aquí se define la lógica de enrutamiento de la aplicación.

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  
    // Optimiza la detección de cambios en Angular agrupando eventos y mejorando el rendimiento de la aplicación.
    
    provideRouter(routes),  
    // Proporciona el enrutador, necesario para manejar las rutas definidas en `app.routes.ts`.

    provideHttpClient()  
    // Proporciona el servicio HttpClient, que se usa para hacer peticiones HTTP (GET, POST, PUT, DELETE) a APIs externas o al backend.
  ]
};
