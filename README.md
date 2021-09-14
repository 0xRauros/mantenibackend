# Mantenimiento- Backend

Front-end para la aplicación de Editor

## Informacion
---
Los usuarios de esta aplicacion estan en la base de datos de ISRI_SPAIN en la tabla usuario
- Los usuarios de tipo 1 no tienen acceso a esta aplicacion
- Los usuarios de tipo 2 son los usuarios de calidad y solo tienen acceso a consultar las operaciones y a los puntos de atencion
- Los usuarios de tipo 3 son los usuarios de ingenieria y estos tienen accaso a todo menos a los puntos de atencion.


El front end se puede acceder a traves de la URL: http://10.73.82.219/editor/

## Desarrollo
---

### Lenguajes:

* Angular

### Desarrollada usando:

* Angular Material
* Bootstrap

### BBDD:

* MSSQL - 10.73.80.4@Ruben.Windows2018 - IsriBruster


### Test de la API:

---

### Despliegue:


* Desplegada en:  `http://10.73.82.219/editor/`
* Servicio: `10.73.82.220:8080 -> API editor || Tomcat`

hay que ejecutar: `ng build` para generar/actualizar la carpeta dist en el directorio anterior. Una vez tengas la carpeta Dist, en el servidor 219, deberás copiar el contenido de dicha carpeta en `C:\inetpub\wwwroot\editor`

### Repositorios:

* Front end `http://10.73.82.219/Bonobo.Git.Server/Editor-front-end.git`
* Back end `http://10.73.82.219/Bonobo.Git.Server/Editor-back-end.git`

## Licencia
---
ISRI
## Organización
---
### Empresa ISRINGHAUSEN: 

ISRINGHAUSEN es una empresa con más de 50 años de experiencia en la fabricación de asientos para vehículos industriales. A día de hoy es suministrador de muchas de las principales marcas de automoción internacional.


