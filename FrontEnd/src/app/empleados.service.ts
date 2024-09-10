import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:5000/empleados';

  // Datos quemados en caso de que no haya conexión al backend
  private empleadosData = [
    { id: 1, nombre: 'Luis', apellido: 'García', departamento: 'TI', cargo: 'Desarrollador', fechaContratacion: '2023-01-01' },
    { id: 2, nombre: 'Ana', apellido: 'Pérez', departamento: 'Marketing', cargo: 'Analista', fechaContratacion: '2022-07-15' }
  ];

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    // Si el backend no responde, devolvemos los datos quemados
    return of(this.empleadosData);
  }

  addEmpleado(empleado: any): Observable<any> {
    empleado.id = this.empleadosData.length + 1;  // Asignar un nuevo ID al empleado
    this.empleadosData.push(empleado);  // Agregar el nuevo empleado a los datos quemados
    return of(empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    const index = this.empleadosData.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.empleadosData[index] = empleado;
    }
    return of(empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    this.empleadosData = this.empleadosData.filter(emp => emp.id !== id);
    return of({ message: 'Empleado eliminado' });
  }
}
