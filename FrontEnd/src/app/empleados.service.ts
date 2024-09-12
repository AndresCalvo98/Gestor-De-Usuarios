import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:5000/api/empleados/';  // URL del backend para empleados
  private departamentosUrl = 'http://localhost:5000/api/departamentos/';  // URL del backend para departamentos

  constructor(private http: HttpClient) {}

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `Error del lado del cliente: ${error.error.message}`;
    } else {
      // El backend devolvió un código de estado de error
      errorMessage = `Error del servidor: Código ${error.status}, ` +
                     `Mensaje: ${error.message}`;
    }
    // Aquí puedes registrar el error para análisis futuro
    console.error(errorMessage);
    // Retorna un observable con el mensaje de error para que el frontend pueda reaccionar
    return throwError(() => new Error(errorMessage));
  }

  // Obtener la lista de empleados
  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar un nuevo empleado
  addEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un empleado existente
  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}`, empleado).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un empleado
  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener la lista de departamentos
  getDepartamentos(): Observable<any> {
    return this.http.get(this.departamentosUrl).pipe(
      catchError(this.handleError)
    );
  }
}