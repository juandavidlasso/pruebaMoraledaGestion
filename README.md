## Pasos para ejecutar el proyecto

La prueba la desarrollé con estructura de App Router ya que es la última actualización de NextJS, pero también he trabajado con Page Router por si tienen preferencia de trabajar con esa estructura.

Implemente Next Auth para el sistema de autenticación.

1. Clonar el repositorio.

2. Abrir la carpeta de el proyecto clonado desde la consola cmd.

3. Ejecutar el comando `npm i` para instalar las dependencias.

4. Ejecutar el comando `npm run build` para compilar el proyecto.

5. Agregar el archivo `.env.local` y agregar las siguientes variables de entorno:

AUTH_SECRET="/+jKd7GIEp35bz3xA+bFNQwT8kNHLL1iiYAhPdf9ql8="
NEXT_PUBLIC_ENV=local
NEXT_PUBLIC_BASE_PATH=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

6. Para probar el proyecto puede ejecutar el comando `npm run dev` para ejecutarlo en modo de desarrollo o puede ejecutar el comando `npm start` para ejecutarlo en modo de producción.

## Ususarios de prueba

1. Usuarios de prueba para autenticarse:

    1.1 email: juan@gmail.com - password: Juan123@ - rol: admin

    1.2 email: pablo@gmail.com - password: Pablo123@ - rol: viewer
