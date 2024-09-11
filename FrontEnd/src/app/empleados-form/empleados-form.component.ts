import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../empleados.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})
export class EmpleadosFormComponent implements OnInit {
  empleado: any = { nombre: '', apellido: '', cargo: '', fechaContratacion: '', departamento: '' };
  departamentos: any[] = [];  // Para almacenar los departamentos
  isEditing = false;

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener los departamentos al cargar el componente
    this.empleadosService.getDepartamentos().subscribe(data => {
      this.departamentos = data;
    });

    const empleadoData = this.route.snapshot.paramMap.get('empleado');
    if (empleadoData) {
      this.empleado = JSON.parse(empleadoData);
      this.isEditing = true;
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.empleadosService.updateEmpleado(this.empleado.id, this.empleado).subscribe(() => {
        this.router.navigate(['/empleados']);
      }, error => {
        console.error('Error al actualizar empleado:', error);
      });
    } else {
      this.empleadosService.addEmpleado(this.empleado).subscribe(() => {
        this.router.navigate(['/empleados']).then(() => {
          this.empleadosService.getEmpleados().subscribe(); // Asegúrate de que se recarguen los empleados después de agregar
        });
      }, error => {
        console.error('Error al agregar empleado:', error);
      });
    }
  }
}