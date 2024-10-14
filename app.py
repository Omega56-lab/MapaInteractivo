from flask import Flask, request, jsonify, render_template
import mysql.connector
import os  
from dotenv import load_dotenv 


load_dotenv()

app = Flask(__name__)

db_config = {
    'host': os.getenv('DB_HOST'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}
API_KEY = os.getenv('API_KEY')

@app.route('/')
def home():
    return render_template('index.html', api_key=API_KEY)


@app.route('/get_edificios', methods=['GET'])
def get_edificios():
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        # Consulta para obtener los edificios y su accesibilidad
        query = """
            SELECT e.id_edificios, e.nombre, e.direccion, e.latitud, e.longitud, GROUP_CONCAT(a.nombre SEPARATOR ', ') AS accesibilidad
            FROM edificios e
            LEFT JOIN edificios_accesibilidad ea ON e.id_edificios = ea.edificio_id
            LEFT JOIN tipos_accesibilidad a ON ea.tipo_accesibilidad_id = a.id_tipos
            GROUP BY e.id_edificios;
        """
        cursor.execute(query)
        edificios = cursor.fetchall()

        return jsonify(edificios), 200
    except mysql.connector.Error as e:
        return jsonify({"error": f"Error de base de datos: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Error general: {str(e)}"}), 500
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

# Ruta para obtener tipos de accesibilidad
@app.route('/get_tipos_accesibilidad')
def get_tipos_accesibilidad():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT DISTINCT * FROM tipos_accesibilidad")
    tipos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(tipos)

# Ruta para agregar un nuevo edificio
@app.route('/add_edificio', methods=['POST'])
def add_edificio():
    data = request.get_json()
    nombre = data['nombre']
    direccion = data['direccion']
    latitud = data['latitud']
    longitud = data['longitud']
    tipo_accesibilidad = data['tipo_accesibilidad']

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        # Insertar el edificio
        cursor.execute("INSERT INTO edificios (nombre, direccion, latitud, longitud) VALUES (%s, %s, %s, %s)", 
                       (nombre, direccion, latitud, longitud))
        edificio_id = cursor.lastrowid  # Obtener el ID del edificio recién agregado

        # Insertar cada tipo de accesibilidad individualmente
        for tipo in tipo_accesibilidad:
            cursor.execute("INSERT INTO edificios_accesibilidad (edificio_id, tipo_accesibilidad_id) VALUES (%s, %s)", 
                           (edificio_id, tipo))
        
        # Confirmar los cambios
        conn.commit()
        return jsonify(success=True)

    except mysql.connector.Error as e:
        return jsonify({"error": f"Error de base de datos: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Error general: {str(e)}"}), 500
    finally:
        cursor.close()
        conn.close()



@app.route('/delete_edificio/<int:edificio_id>', methods=['DELETE'])
def delete_edificio(edificio_id):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        
        # Eliminar las entradas de la tabla de accesibilidad primero
        cursor.execute("DELETE FROM edificios_accesibilidad WHERE edificio_id = %s", (edificio_id,))
        
        # Eliminar el edificio
        cursor.execute("DELETE FROM edificios WHERE id_edificios = %s", (edificio_id,))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify(success=True)
    except mysql.connector.Error as e:
        return jsonify({"error": f"Error de base de datos: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"error": f"Error general: {str(e)}"}), 500
        

@app.route('/edit_edificio/<int:edificio_id>', methods=['PUT'])
def edit_edificio(edificio_id):
    data = request.get_json()
    nombre = data['nombre']
    direccion = data['direccion']
    latitud = data['latitud']
    longitud = data['longitud']
    tipo_accesibilidad = data['tipo_accesibilidad']

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    # Actualizar el edificio
    cursor.execute("""
        UPDATE edificios 
        SET nombre = %s, direccion = %s, latitud = %s, longitud = %s 
        WHERE id_edificios = %s
    """, (nombre, direccion, latitud, longitud, edificio_id))

    # Eliminar accesibilidades existentes
    cursor.execute("DELETE FROM edificios_accesibilidad WHERE edificio_id = %s", (edificio_id,))
    
    # Insertar nuevas accesibilidades
    for tipo in tipo_accesibilidad:
        cursor.execute("INSERT INTO edificios_accesibilidad (edificio_id, tipo_accesibilidad_id) VALUES (%s, %s)", 
                       (edificio_id, tipo))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(success=True)


if __name__ == '__main__':
    app.run(debug=True)
