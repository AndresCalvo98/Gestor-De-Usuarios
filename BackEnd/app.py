from flask import Flask, jsonify, request  # Importar Flask para crear la app, jsonify para enviar respuestas en formato JSON, y request para manejar solicitudes
from flask_restx import Api, Resource  # Importar Api y Resource para manejar las rutas y los recursos de la API REST
from flask_cors import CORS  # Importar CORS para permitir solicitudes entre orígenes (cross-origin)
import datetime  # Importar datetime para manejar la validación de fechas

# Crear la aplicación Flask
app = Flask(__name__)

# Configuración de CORS: Permitir solicitudes solo desde el frontend Angular en localhost:4200
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

# Crear la API con el prefijo /api para todas las rutas
api = Api(app, prefix="/api")

# Simulación de base de datos para empleados (lista en memoria)
empleados = [
    {"id": 1, "nombre": "Luis", "apellido": "García", "departamento": 1, "cargo": "Desarrollador", "fechaContratacion": "2023-01-01"},
    {"id": 2, "nombre": "Ana", "apellido": "Pérez", "departamento": 2, "cargo": "Analista", "fechaContratacion": "2022-07-15"}
]

# Simulación de base de datos para departamentos (lista en memoria)
departamentos = [
    {"id": 1, "nombre": "TI"},
    {"id": 2, "nombre": "Marketing"},
    {"id": 3, "nombre": "RRHH"}
]

# Definir un namespace para las rutas de empleados
ns_empleados = api.namespace('empleados', description='Operaciones relacionadas con empleados')

# Ruta para manejar el listado y creación de empleados
@ns_empleados.route('/')
class EmpleadosResource(Resource):
    # Método GET para obtener la lista de empleados
    def get(self):
        # Devolver la lista de empleados como JSON
        return jsonify(empleados)

    # Método POST para agregar un nuevo empleado
    def post(self):
        # Obtener los datos del nuevo empleado del cuerpo de la solicitud
        nuevo_empleado = request.json
        # Generar un nuevo ID basado en el mayor ID existente
        nuevo_empleado['id'] = max([emp['id'] for emp in empleados]) + 1 if empleados else 1
        # Agregar el nuevo empleado a la lista de empleados
        empleados.append(nuevo_empleado)
        # Devolver el nuevo empleado y un código 201 (creado)
        return nuevo_empleado, 201

# Ruta para manejar operaciones con un empleado específico (obtener, actualizar, eliminar)
@ns_empleados.route('/<int:id>')
class EmpleadoResource(Resource):
    # Método GET para obtener un empleado por ID
    def get(self, id):
        # Buscar el empleado en la lista por su ID
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        # Si se encuentra el empleado, devolverlo
        if empleado:
            return empleado
        # Si no se encuentra, devolver un mensaje de error con código 404
        return {"message": "Empleado no encontrado"}, 404

    # Método PUT para actualizar un empleado por ID
    def put(self, id):
        # Buscar el empleado por su ID
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        # Si no se encuentra el empleado, devolver un error 404
        if not empleado:
            return {"message": "Empleado no encontrado"}, 404
        
        # Obtener los datos enviados en la solicitud para actualizar el empleado
        data = request.json
        
        # Validar que los campos requeridos estén presentes
        required_fields = ['nombre', 'apellido', 'departamento', 'cargo', 'fechaContratacion']
        for field in required_fields:
            if field not in data or not data[field]:
                return {"message": f"El campo '{field}' es requerido."}, 400
        
        # Validar que el departamento sea un número y que exista en la lista de departamentos
        try:
            departamento_id = int(data['departamento'])  # Convertir a número
        except ValueError:
            return {"message": "El ID del departamento debe ser un número."}, 400

        # Verificar que el departamento exista en la lista
        departamento = next((dept for dept in departamentos if dept['id'] == departamento_id), None)
        if not departamento:
            return {"message": "Departamento inválido. ID de departamento no encontrado."}, 400
        
        # Validar que la fecha de contratación tenga el formato correcto (YYYY-MM-DD)
        try:
            fecha = data['fechaContratacion']
            datetime.datetime.strptime(fecha, "%Y-%m-%d")
        except ValueError:
            return {"message": "Fecha de contratación inválida. El formato debe ser YYYY-MM-DD."}, 400
        
        # Actualizar los datos del empleado con los nuevos valores
        empleado.update({
            "nombre": data['nombre'],
            "apellido": data['apellido'],
            "departamento": departamento_id,  # Actualizar el ID del departamento
            "cargo": data['cargo'],
            "fechaContratacion": data['fechaContratacion']
        })

        # Devolver el empleado actualizado
        return empleado, 200

    # Método DELETE para eliminar un empleado por ID
    def delete(self, id):
        # Acceder a la lista de empleados globalmente
        global empleados
        # Filtrar la lista de empleados para eliminar el empleado con el ID dado
        empleados = [emp for emp in empleados if emp['id'] != id]
        # Devolver un mensaje de éxito
        return {"message": "Empleado eliminado"}, 200

# Definir un namespace para las rutas de departamentos
ns_departamentos = api.namespace('departamentos', description='Operaciones relacionadas con departamentos')

# Ruta para manejar el listado y creación de departamentos
@ns_departamentos.route('/')
class DepartamentosResource(Resource):
    # Método GET para obtener la lista de departamentos
    def get(self):
        # Devolver la lista de departamentos como JSON
        return jsonify(departamentos)

    # Método POST para agregar un nuevo departamento
    def post(self):
        # Obtener los datos del nuevo departamento
        nuevo_departamento = request.json
        # Generar un nuevo ID para el departamento
        nuevo_departamento['id'] = max([dept['id'] for dept in departamentos]) + 1 if departamentos else 1
        # Agregar el nuevo departamento a la lista
        departamentos.append(nuevo_departamento)
        # Devolver el nuevo departamento y un código 201 (creado)
        return nuevo_departamento, 201

# Ejecutar la aplicación si el archivo se está ejecutando directamente
if __name__ == '__main__':
    app.run(debug=True)
