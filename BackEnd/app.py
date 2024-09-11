from flask import Flask, jsonify, request
from flask_restx import Api, Resource
from flask_cors import CORS  # Importar CORS para habilitar solicitudes desde otros orígenes
import datetime

# Crear la aplicación Flask
app = Flask(__name__)

# Configuración de CORS: Permitir solicitudes solo desde el frontend Angular (localhost:4200)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

# Crear la API con el prefijo /api
api = Api(app, prefix="/api")

# Simulación de base de datos para empleados
empleados = [
    {"id": 1, "nombre": "Luis", "apellido": "García", "departamento": "TI", "cargo": "Desarrollador", "fechaContratacion": "2023-01-01"},
    {"id": 2, "nombre": "Ana", "apellido": "Pérez", "departamento": "Marketing", "cargo": "Analista", "fechaContratacion": "2022-07-15"}
]

# Simulación de base de datos para departamentos
departamentos = [
    {"id": 1, "nombre": "TI"},
    {"id": 2, "nombre": "Marketing"},
    {"id": 3, "nombre": "RRHH"}
]

# Lista de departamentos permitidos
departamentos_validos = ["TI", "Marketing", "RRHH"]

# Definir un namespace para las rutas de empleados
ns_empleados = api.namespace('empleados', description='Operaciones relacionadas con empleados')

@ns_empleados.route('/')
class EmpleadosResource(Resource):
    def get(self):
        # Obtener todos los empleados
        return jsonify(empleados)

    def post(self):
        # Agregar un nuevo empleado
        nuevo_empleado = request.json
        nuevo_empleado['id'] = max([emp['id'] for emp in empleados]) + 1 if empleados else 1
        empleados.append(nuevo_empleado)
        return nuevo_empleado, 201

@ns_empleados.route('/<int:id>')
class EmpleadoResource(Resource):
    def get(self, id):
        # Obtener un empleado por ID
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        if empleado:
            return empleado
        return {"message": "Empleado no encontrado"}, 404

    def put(self, id):
        # Obtener el empleado por ID
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        if not empleado:
            return {"message": "Empleado no encontrado"}, 404
        
        data = request.json
        
        # Validar que los campos requeridos estén presentes
        required_fields = ['nombre', 'apellido', 'departamento', 'cargo', 'fechaContratacion']
        for field in required_fields:
            if field not in data or not data[field]:
                return {"message": f"El campo '{field}' es requerido."}, 400
        
        # Validar que el departamento sea válido
        if data['departamento'] not in departamentos_validos:
            return {"message": "Departamento inválido. Los departamentos válidos son: TI, Marketing, RRHH."}, 400
        
        # Validar que la fecha de contratación tenga un formato correcto
        try:
            fecha = data['fechaContratacion']
            datetime.datetime.strptime(fecha, "%Y-%m-%d")
        except ValueError:
            return {"message": "Fecha de contratación inválida. El formato debe ser YYYY-MM-DD."}, 400
        
        # Actualizar los datos del empleado
        empleado.update(data)
        return empleado, 200

    def delete(self, id):
        # Eliminar un empleado por ID
        global empleados
        empleados = [emp for emp in empleados if emp['id'] != id]
        return {"message": "Empleado eliminado"}, 200

# Definir un namespace para las rutas de departamentos
ns_departamentos = api.namespace('departamentos', description='Operaciones relacionadas con departamentos')

@ns_departamentos.route('/')
class DepartamentosResource(Resource):
    def get(self):
        # Obtener todos los departamentos
        return jsonify(departamentos)

if __name__ == '__main__':
    app.run(debug=True)
