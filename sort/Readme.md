# Sort Ascending

## Configuración del repositorio
## Compilar un archivo
Ejecutar `tsc index.ts` compila y genera un archivo .js que es el que se ejecuta.

## Estructurar el repositorio
como primer paso se puede separar en el codigo fuente y en los codigos generados despues de compilarse el codigo.
    `src`: contiene el codigo fuente
    `build`: contiene el codigo generado

Para configurar esto, se debe ejecutar tsc --init que nos generara un archivo tsconfig.json con la configuracion del repositorio.

>`outDir`: directorio donde se guardaran todos los archivos compilados.
>`rootDir`: directorio donde se guardaran todos los archivos fuente.

Una vez que esta configurado este archivo, no es necesario indicar que archivo vamos a compilar, sino que se compilaran todos los archivos que haya en src unicamnete usando el comando `tsc`

## Ejecutar de forma continua el compilador
Para mantener al compilador compilando nuestro codigo, se debe ejecutar el siguiente comando
`tsc -w`

# Type Guaards
Los checkeosde tipos se hacen para asegurar que las operaciones siguientes cuenten con las propiedades y metodos necesarios para realizarse.
Se pueden usar 2 formas:

>`typeof`: sirve para comparar el tipo de un dato comparandolo con un dato primitivo "string, number o boolean". if (typeof numero === number) {..}

>`instanceof`: sirve para comparar el tipo de un dato con un dato no primitivo > if (fecha instanceof Date) {..}
