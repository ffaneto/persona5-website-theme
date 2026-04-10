import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='dist')

# Servir el frontend de React y manejar las rutas del cliente (React Router)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    # Si el archivo existe en la carpeta dist, lo servimos directamente
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        # De lo contrario, servimos index.html para que React Router maneje la ruta
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    print("Iniciando servidor Flask en http://localhost:5000")
    app.run(debug=True, port=5000)
