import { Component } from '@angular/core';  // Importa la clase Component de Angular, que se usa para definir un componente
import { RouterOutlet } from '@angular/router';  // Importa RouterOutlet, que se usa para mostrar los componentes asociados con las rutas

@Component({
  selector: 'app-root',  // Define el selector del componente. Se usará en el HTML como <app-root> para representar este componente
  standalone: true,  // Define que este componente es independiente y no depende de otros módulos para funcionar
  imports: [RouterOutlet],  // Importa RouterOutlet, que es responsable de insertar y mostrar los componentes asociados con las rutas en esta ubicación
  templateUrl: './app.component.html',  // Enlace al archivo HTML que define la vista (template) de este componente
  styleUrl: './app.component.css'  // Enlace al archivo CSS que define los estilos específicos para este componente
})
export class AppComponent {
  title = 'FrontEnd';  // Propiedad que define el título de la aplicación. Puede usarse en el HTML con interpolación {{ title }}.
}
