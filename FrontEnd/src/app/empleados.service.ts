// Importamos las dependencias necesarias de Angular y RxJS
import { Injectable } from '@angular/core';  // Hace que este servicio pueda ser inyectado en cualquier componente
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  // Para hacer peticiones HTTP
import { Observable, throwError } from 'rxjs';  // Observable para manejar asincronía y errores
import { catchError } from 'rxjs/operators';  // Operador para interceptar y manejar errores en las peticiones

// Decorador `@Injectable` indica que este servicio se puede inyectar en otros componentes o servicios
@Injectable({
  providedIn: 'root'  // `providedIn: 'root'` hace que este servicio esté disponible en toda la aplicación
})
export class EmpleadosService {
  // Definimos la URL base para las peticiones relacionadas con empleados
  private apiUrl = 'http://localhost:5000/api/empleados/';  // La URL del backend donde se manejan los empleados
  // Definimos la URL base para las peticiones relacionadas con departamentos
  private departamentosUrl = 'http://localhost:5000/api/departamentos/';  // La URL del backend para los departamentos

  // Constructor del servicio, donde se inyecta el servicio `HttpClient` para manejar las peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método privado para manejar los errores que puedan ocurrir durante una petición HTTP
  private handleError(error: HttpErrorResponse) {
    // Declaramos una variable para almacenar el mensaje de error
    let errorMessage = '';

    // Si el error es del lado del cliente o de la red (como un problema de conexión)
    if (error.error instanceof ErrorEvent) {
      // Asignamos un mensaje de error específico para el cliente
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else {
      // Si el error proviene del servidor (como un código de estado HTTP 500, por ejemplo)
      // Creamos un mensaje más detallado con el código de error y el mensaje del servidor
      errorMessage = `Error del servidor: Código ${error.status}, Mensaje: ${error.message}`;
    }

    // Mostramos el error en la consola para facilitar la depuración
    console.error(errorMessage);

    // Utilizamos `throwError` para lanzar un error observable con el mensaje que se generó
    // Esto permite que el componente que use el servicio pueda reaccionar al error
    return throwError(() => new Error(errorMessage));
  }

  // Método para obtener la lista de empleados
  getEmpleados(): Observable<any> {
    // Hacemos una petición HTTP GET a la URL del backend para obtener la lista de empleados
    return this.http.get(this.apiUrl).pipe(
      // Si hay un error en la petición, lo capturamos y lo manejamos con `handleError`
      catchError(this.handleError)
    );
  }

  // Método para agregar un nuevo empleado
  addEmpleado(empleado: any): Observable<any> {
    // Hacemos una petición HTTP POST para enviar los datos de un nuevo empleado al servidor
    // El objeto `empleado` contiene la información del nuevo empleado que se va a enviar
    return this.http.post(this.apiUrl, empleado).pipe(
      // Si hay un error en la petición, lo capturamos y lo manejamos con `handleError`
      catchError(this.handleError)
    );
  }

  // Método para actualizar un empleado existente
  // Se pasa el `id` del empleado y el objeto `empleado` con los datos actualizados
  updateEmpleado(id: number, empleado: any): Observable<any> {
    // Hacemos una petición HTTP PUT para actualizar un empleado específico usando su ID
    // `${this.apiUrl}${id}` construye la URL con el ID del empleado que se va a actualizar
    return this.http.put(`${this.apiUrl}${id}`, empleado).pipe(
      // Si hay un error en la petición, lo capturamos y lo manejamos con `handleError`
      catchError(this.handleError)
    );
  }

  // Método para eliminar un empleado basado en su ID
  deleteEmpleado(id: number): Observable<any> {
    // Hacemos una petición HTTP DELETE para eliminar un empleado específico usando su ID
    // `${this.apiUrl}${id}` construye la URL con el ID del empleado que se va a eliminar
    return this.http.delete(`${this.apiUrl}${id}`).pipe(
      // Si hay un error en la petición, lo capturamos y lo manejamos con `handleError`
      catchError(this.handleError)
    );
  }

  // Método para obtener la lista de departamentos
  getDepartamentos(): Observable<any> {
    // Hacemos una petición HTTP GET a la URL del backend para obtener la lista de departamentos
    return this.http.get(this.departamentosUrl).pipe(
      // Si hay un error en la petición, lo capturamos y lo manejamos con `handleError`
      catchError(this.handleError)
    );
  }
}
