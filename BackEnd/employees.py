from flask import Flask, jsonify, request
from flask_restx import Api, Resource

app = Flask(__name__)
api = Api(app)

# Simulación de base de datos con diccionarios
empleados = [
    {"id": 1, "nombre": "Luis", "apellido": "García", "departamento": "TI", "cargo": "Desarrollador", "fechaContratacion": "2023-01-01"},
    {"id": 2, "nombre": "Ana", "apellido": "Pérez", "departamento": "Marketing", "cargo": "Analista", "fechaContratacion": "2022-07-15"}
]

# Definir un namespace para organizar las rutas
ns_empleados = api.namespace('empleados', description='Operaciones relacionadas a empleados')

@ns_empleados.route('/')
class EmpleadosResource(Resource):
    def get(self):
        return jsonify(empleados)

    def post(self):
        nuevo_empleado = request.json
        nuevo_empleado['id'] = len(empleados) + 1
        empleados.append(nuevo_empleado)
        return nuevo_empleado, 201

@ns_empleados.route('/<int:id>')
class EmpleadoResource(Resource):
    def get(self, id):
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        if empleado:
            return empleado
        return {"message": "Empleado no encontrado"}, 404

    def put(self, id):
        empleado = next((emp for emp in empleados if emp['id'] == id), None)
        if empleado:
            data = request.json
            empleado.update(data)
            return empleado
        return {"message": "Empleado no encontrado"}, 404

    def delete(self, id):
        global empleados
        empleados = [emp for emp in empleados if emp['id'] != id]
        return {"message": "Empleado eliminado"}, 200

if __name__ == '__main__':
    app.run(debug=True)
