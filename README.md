# Proyecto de Gestión de Empleados

## Descripción

Este proyecto es una aplicación web para la gestión de empleados utilizando **Angular** para el frontend y **Flask** para el backend. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre empleados y departamentos.

## Requisitos

### General
- **Git**: Para clonar el repositorio.
- **Python 3.x**: Para el backend (Flask).
- **Node.js y npm**: Para el frontend (Angular).

### Backend (Flask)
- **Flask**: Framework para crear la API RESTful.
- **Flask-RESTX**: Para gestionar la API.
- **Flask-CORS**: Para manejar peticiones entre dominios (frontend y backend).
  
### Frontend (Angular)
- **Angular CLI**: Herramienta para ejecutar y desarrollar la aplicación Angular.

## Instrucciones de Instalación y Ejecución

### 1. Clonar el Repositorio

Clona el repositorio en tu máquina local y entra en la carpeta del proyecto:

### 2. Configurar el Backend (Flask)

### a. Activar el entorno virtual
El entorno virtual ya está creado en el proyecto, así que solo necesitas activarlo:

# Activar el entorno virtual en Windows:
venv\Scripts\activate

# O en Linux/MacOS:
source venv/bin/activate

### b. Instalar las dependencias del backend
Si las dependencias no están instaladas, puedes instalarlas usando `pip`:

pip install -r requirements.txt

Si no tienes el archivo requirements.txt, puedes instalar manualmente las dependencias principales:

pip install flask flask-restx flask-cors


### c. Ejecutar el backend
Ejecuta el servidor Flask en tu máquina local:

python app.py

Esto iniciará el backend en http://localhost:5000.


## 3. Configurar el Frontend (Angular)

### a. Instalar Angular CLI
Si no tienes Angular CLI instalado globalmente, puedes instalarlo con npm:

npm install -g @angular/cli


### b. Instalar dependencias del frontend
Navega a la carpeta `FrontEnd` del proyecto y ejecuta el siguiente comando para instalar todas las dependencias del frontend:

cd FrontEnd
npm install


### c. Ejecutar el frontend
Una vez instaladas las dependencias, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Angular:

ng serve

Esto iniciará el frontend en http://localhost:4200


