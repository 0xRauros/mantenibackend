# Mantenimiento- Backend

Back-end para la aplicación de Mantenimiento. Este es la API del sistema [Mantenimiento-Frontend](http://10.73.82.219/Bonobo.Git.Server/Repository/Detail/801c1d6b-2663-4521-9079-4b0fd1145ef4) y esta conectado a la base de datos Mantenimiento y utiliza registros de la base de datos DATOS7QB_ISRI_SPAIN.

## Informacion
---
Back-end controlador de bbdd Mantenimiento y DATOS7QB_ISRI_SPAIN.
El proyecto está realizado en:
- [Node.js](https://nodejs.org/es/)
- [Typrescript](https://www.typescriptlang.org/)
- [SQL]()

### BBDD:

* MSSQL - 10.73.80.4@Ruben.Windows2018 - Mantenimiento
* MSSQL - 10.73.80.4@Ruben.Windows2018 - DATOS7QB_ISRI_SPAIN

## Programas necesarios
---
Para poder utilizar el proyecto en localhost en necesario clonarlo y tener algunos programas necesarios:

- [Nodejs](https://nodejs.org/es/download/) v14.17.0 o Superior.
- [VS Code](https://code.visualstudio.com/download)
- [PostMan](https://www.postman.com/downloads/) para puebas de APIS. (Opcional)
- [Git](https://git-scm.com/downloads) para poder gestionar las versiones.
## Como Clonar
---
Comando para clonar:

```bash
cd CARPETA_PROYECTO
git clone [LINK DEL REPOSITORIO]
```
## Instalación
---
Ya clonado el proyecto es necesario instalar todas las dependencias con el comando:
```bash
npm install
```
### Run en LocalHost:
---
- Cambiar el puerto en el archivo [index.ts](/src/index.ts) en la línea: 
````bash
this.app.set('port', process.env.PORT || 3011);
````
- Ejecutar script build y dev 
````bash
npm run build
npm run dev
````
Este a su vez ejecutara en la funcionalidad de pruebas y dev.
### Run en Producción:
---
- Cambiar el puerto en el archivo [index.ts](/src/index.ts) en la línea 52: 
```bash
this.app.set('port', process.env.PORT || 3011);
```
- Cambiar name y description del archivo [service.js](/service.js) en la línea 6 y 7:
```bash
...
name: 'API MANTENIMIENTO',
description: 'API MANTENIMIENTO 3011',
...
```
- Cuando el puerto sea el deseado ejecutar el comando:

```bash
cd CARPETA_PROYECTO
npm install node-windows
node service.js
```
Este a su vez inciará el servicio para la ejecución del servidor en producción

## Subir cambios


### Repositorios:

* Back end `http://10.73.82.219/Bonobo.Git.Server/Backend-mantenimiento.git`

---
Para poder subir cambios al repositorio es necesario utilizar los siguientes comandos.

`git add .` o si lo prefiere `git add "./direction_file"`

```bash
git commit -m "tu mensaje"
git push origin master
```

o si usted se encuentra en otro branch

```bash
git push origin "your_branch"
```
##Como hacer un buen commit

Cada cada commit deberá de llevar alguna bandersa que distinga lo que se realizo en el commit. Debe utilizarse las siguientes banderas. 
Es recomendado utilizar un icono como referencia visual de la bandera que se esa utilizando. 
  Ejemplo de banderas.
  - `f.-`  **feat**: Ha añadido una nueva freature (modulo, o la salida completa de una característica) 
  - `F.-`  **fix**: Ha realizado un cambio que repará un Bug
  - `d.-`  **docs**: Ha realizado cambios en la documentación
  - `s.-`  **style**: Ha realizado cambios que representen estilos 
  - `r.-`  **refactor**:Ha realizado cambios de codigo que no corrigieron ningún Bug o añadieron una feature
  - `t.-`  **test**:  Todo a aquel cambio que sea modo de prueba
  - `c.-`  **chore**: Ha actualizado un tarea construida previamente, configuracion en el package manager, etc.
## Licencia
---
ISRI
## Organización
---
### Empresa ISRINGHAUSEN: 

ISRINGHAUSEN es una empresa con más de 50 años de experiencia en la fabricación de asientos para vehículos industriales. A día de hoy es suministrador de muchas de las principales marcas de automoción internacional.


