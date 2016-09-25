# README #

Info para configurar y correr el proyecto local

### Que necesito tener instalado? ###

* Node.js (https://docs.npmjs.com/getting-started/installing-node)
* Nodemon (http://nodemon.io/)
* MongoDB (https://docs.mongodb.com/manual/installation/)
* Mocha

### Instalar Nodemon global###
```
#!script
npm install nodemon -g
```

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
>mongo rockolas
```
* Insertar datos de prueba
```
#!script
>db.rockolas.insert({nombre:'RockolaPNT', temas:[{nombreUsuario:'Rockolero', titulo:'The Rolling Stones - (I Can\'t Get No) Satisfaction', thumbnail:'https://i.ytimg.com/vi/nrIPxlFzDi0/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68', videoId:'nrIPxlFzDi0'}]})
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