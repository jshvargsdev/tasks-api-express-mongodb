# tasks-api-express-mongodb

Proyecto de una API de tareas con Express, MongoDB y JSON Web Tokens.

## Características

- Autenticación con JSON Web Tokens.
- Crear, leer, actualizar y eliminar tareas.
- Protección de rutas con middleware de autenticación.
- Manejo de errores personalizados.

## Instalación

1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Crear un archivo `.env` con las variables de entorno.
4. Iniciar el servidor con `npm run dev`.

## Rutas

### Autenticación

- `POST /register`: Registra un nuevo usuario.
- `POST /login`: Inicia sesión con un usuario y contraseña.
- `POST /logout`: Cierra la sesión actual.

### Tareas

- `GET /tasks`: Obtiene todas las tareas del usuario autenticado.
- `POST /tasks`: Crea una nueva tarea.
- `GET /tasks/:id`: Obtiene una tarea por su ID.
- `PATCH /tasks/:id`: Actualiza una tarea por su ID.
- `DELETE /tasks/:id`: Elimina una tarea por su ID.
