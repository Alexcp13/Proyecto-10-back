# DESCRIPTION

Este proyecto simula un backend para una pagina web para viajes en grupos. Proporciona funcionalidades para almacenar datos en una base de datos y en Cloudinary,
además de un sistema de registro e inicio de sesión.



# FEATURES

-Modelos de eventos:

El proyecto incluye un modelo de evento, donde se puede crear, apuntarse,
desapuntarse, actualizar y borrar.



-Modelo de usuario:

Se ha implementado un modelo de usuario con funcion de registro e inicio de sesión.

-Gestión de imágenes en Cloudinary:

El proyecto permite subir y borrar fotos utilizando Cloudinary.

-Control de acceso según roles:

Los usuarios pueden acceder a diferentes partes del proyecto
según su rol (admin o user).


# API ENDPOINTS

## EVENTS ROUTES  "/api/v1/events"

|HTTP Method | URI path                      | Description              |
|------------|-------------------------------|--------------------------|
|Get         | '/getEvent '                  | Coger todos los eventos  |
|Get         | '/getEventById/:id'           | Traerlas segun su id     |
|Get         | '/getMyEvents/:id/myEvents'   | Coger mis eventos        |
|Post        | '/createEvent'                | Crear eventos            |
|Patch       | '/addAssistant/:id/add'       | Añadir asistente         | 
|Patch       | '/removeAssistant/:id/remove' | Remover asistente        |
|Patch       | '/updateEvent/:id'            | Actualizar eventos       |
|Delete      | '/deleteEvents/:id'           | Borrar Eventos           |
 





## USER ROUTES  "/api/v1/users"

|HTTP Method | URI path                 | Description              |
|------------|------------------------  |--------------------------|
|Get         | '/getUsers '             | Coger todos los juegos   |
|Get         | '/getUserById/:id'       | Traerlos segun su id     |
|Post        | '/registerUser/register' | Registrar usuario        |
|Post        | 'login/login'            | Loguear al usuario       |




# MIDDLEWARES.

auth: Crea un token para la verificación del usuario.

admin: Verifica que tienes rango "admin".

admirOrOwner: Verifica que seas el creador del evento o el admin

file: Guarda las fotos en cloudinary.




# TECH

-JavaScript (JS): Lenguaje de programación principal.

-Node.js: Entorno de ejecución para JavaScript en el servidor.

-MongoDB Atlas: Servicio de base de datos en la nube.

-Cloudinary: Plataforma para almacenar y gestionar imágenes.

-jsonwebtoken: Librería para la autenticación basada en tokens.

-multer: Middleware para manejar la carga de archivos.

-bcrypt: Librería para el cifrado de contraseñas.




# INSTALLATION

npm i :

-express
-mongoose
-dotenv
-jsonwebtoken
-multer
-multer-storage-cloudinary
-nodemon
-bcrypt
-cloudinary
