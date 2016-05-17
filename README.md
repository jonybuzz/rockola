# README #

Info para configurar y correr el proyecto local

### Que necesito tener instalado? ###

* Node.js (https://docs.npmjs.com/getting-started/installing-node)
* MongoDB (https://docs.mongodb.com/manual/installation/)
* Mocha

### Setup MongoDB ###

* Crear el directorio "data\db"
* Ejecutar el server de Mongo desde el directorio bin (Por default --dbpath es "\data\db" y el puerto 27019)
```
#!script
>mongod --dbpath "ruta a data"
```
* Conectarse a la base (si no existe, la crea)
```
#!script
>mongo rockola
```
* Insertar datos de prueba
```
#!script
>db.rockola.insert({nombre:'RockolaPNT', temas:[{nombreUsuario:'Lucas', titulo:'AC/DC - Thunderstruck Live HD', thumbnail:'https://i.ytimg.com/vi/n_GFN3a0yj0/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=wbmZFQryv0VYanw1miqknt5w2ms', videoId:'n_GFN3a0yj0'}]})
```
### Iniciar el servidor Node ###
En el directorio del proyecto
```
#!script
>npm install
>npm start
```
Por default, Node atiende en el puerto 3000

### Cómo correr los tests ###

* Instalar Mocha en el proyecto
```
#!script
>npm install -g mocha@1.16.2
```
* Correr todos los tests
```
#!script
>rockola\private> mocha
```

### Integrantes ###
Colo, Edu, Emi, Feli, Jhony, Jona, Willy