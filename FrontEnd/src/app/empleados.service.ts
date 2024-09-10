import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de tener HttpClient importado
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:5000/empleados/';  // URL de tu backend Flask

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }

  updateEmpleado(id: number, empleado: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empleado);
  }

  deleteEmpleado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

