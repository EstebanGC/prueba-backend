# Enfoque Técnico y Despliegue

## Enfoque y Decisiones Técnicas

- **Base de Datos**  
  Se utilizó PostgreSQL en entorno local. También puede usarse Docker mediante un archivo `docker-compose.yml` para levantar una instancia rápidamente.

- **ORM**  
  Se eligió TypeORM por su estructura modular y su similitud con el estilo de desarrollo de NestJS.

- **Gestión de Configuración**  
  Las variables de entorno se manejan mediante archivos `.env` utilizando la librería `@nestjs/config`.

- **Validación de Datos**  
  Se implementaron validaciones en los DTOs utilizando la librería `class-validator`.

- **Manejo de Excepciones**  
  Se utilizaron clases de excepción como `NotFoundException` para manejar errores comunes en la API.

- **Pruebas Unitarias**  
  Las pruebas se implementaron con Jest, enfocándose en el servicio `ProductsService`.

## Soluciones Adicionales

### Despliegue en AWS

1. Crear un `Dockerfile` para construir una imagen de la API.
2. Subir la imagen a un repositorio en Amazon ECR.
3. Crear una instancia de base de datos PostgreSQL en Amazon RDS.
4. Configurar las reglas de seguridad para que el puerto 5432 solo esté disponible para ECS.
5. Crear un Task Definition en ECS utilizando la imagen construida y las variables de entorno necesarias.

### Manejo de Secretos con AWS Secrets Manager

- Guardar los secrets como `DB_HOST`, `DB_USER`, `DB_PASSWORD`, etc., en AWS Secrets Manager.
- Asociar los secrets como variables de entorno en la Task Definition de ECS.
