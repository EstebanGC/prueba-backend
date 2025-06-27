
##Enfoque y decisiones técnicas

    Utilicé TypeORM por su estructura modular y similitud con el estilo de NestJ, PostgreSQL en local (También se puede utilizar Docker con un archivo docker-compose.yml para levantar una instancia de PostgreSQL de manera rápida.

    Configuración de variables por .env usando @nestjs/config

    Validaciones con class-validator en DTOs

    Manejo de excepciones con NotFoundException

    Pruebas unitarias con Jest para ProductsService



##Soluciones adicionales

#Deployment

Para el despliegue con AWS:
Creamos un Dockerfile para construir una imagen de la API. 
Subimos la imagen a Amazon ECR.
Creamos instancia de PostgreSQL en Amazon RDS
Configuramos seguridad: puerto 5432 abierto solo a ECS.
Definimos un Task Definition con la imagen de la API del primer punto y variables de entorno tomadas de Secrets Manager.


Para el manejo de secretos con AWS Secrets Manager
Guardar valores como DB_HOST, DB_USER, DB_PASSWORD, etc. en Secrets Manager.
En el Task Definition de ECS, asociar los secretos como variables de entorno.
