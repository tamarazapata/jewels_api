# Tienda de Joyas API

API REST para la gestión de una tienda de joyas. Permite obtener joyas con filtros avanzados, paginación y ordenamiento, además de operaciones CRUD.

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```sh
   git clone https://github.com/tamarazapata/jewels_api.git
   ```

2. **Instalar dependencias**:
   ```sh
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
   ```ini
   PORT=3000
   DB_HOST=localhost
   USER_DB=tu_usuario
   PASSWORD_DB=tu_contraseña
   NAME_DATABASE=joyas
   DB_PORT=5432
   ```

4. **Ejecutar el servidor**:
   ```sh
   npm run dev  # Con nodemon (desarrollo)
   node server.js  # Modo normal
   ```

## Endpoints

### Obtener todas las joyas (con paginación y orden)
```
GET /joyas?limits=3&page=2&order_by=stock_ASC
```

### Filtrar joyas por precio, categoría y metal
```
GET /joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
```

###  Agregar una nueva joya
```
POST /joyas
```
####  **Body (JSON)**
```json
{
    "nombre": "Anillo Diamante",
    "categoria": "anillo",
    "metal": "oro",
    "precio": 50000,
    "stock": 3
}
```

###  Actualizar una joya
```
PUT /joyas/:id
```
####  **Body (JSON)**
```json
{
    "nombre": "Collar Heart Luxury",
    "categoria": "collar",
    "metal": "oro",
    "precio": 22000,
    "stock": 5
}
```

###  Eliminar una joya
```
DELETE /joyas/:id
```

## Tecnologías Utilizadas
- Node.js + Express
- PostgreSQL
- pg-format
- dotenv
- nodemon 

