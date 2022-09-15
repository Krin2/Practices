<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollos

1. Clonar repositorio
2. Ejecutar:
  ```
    yarn install
  ```

3. Instalar Nest-cli
  ```
    npm i -g @nestjs/cli
  ```

4. Levantar la base de datos
  ```
    docker-compose up -d
  ```

5. Reconstruir la base de datos con la semilla
  ```
    http://localhost:3000/api/v2/seed
  ```

6. Ejecutar la aplicacion
   1. En modo desarrollo
 ```
    yarn start:dev
  ```
   2. en modo produccion
  ```
    yarn start
  ```

## Stack usado
* MongoDB
* Nest

# creacion de un pipe personalizado
1. Creacion de un modulo comun para toda la aplicacion

```
nest g mo common
```
2. Creacion del pipe mediante nest-cli
```
nest g pi common/pipes/parseMongoId --no-spec
```
## NOTAS:
- cuando creamos un pipe, no hace falta ponerle ...Pipe al nombre porque nest-cli se lo agrega solo
- los pipes creados no se enlazan a ningun módulo

