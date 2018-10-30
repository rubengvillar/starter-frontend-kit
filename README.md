# Introducción
Repositorio base para crear sitios estaticos con GULP y NPM. utilizando la línea de comandos y optimizando nuestro proyecto para producción.

## Instalacion.

### Instalacion y descarga.
Una ves teniendo instalado NodeJS, NPM y Git procedemos descargar el mismo.

`git clone git@github.com:rubengvillar/starter-frontend-kit.git nombre-del-proyecto`

Una ves descargado entramos a la carpeta del proyecto y ejecutamos npm install

`cd nombre-del-proyecto && npm install`

Tambien para la optimizacion de imagenes pueden instalar ImageMagick en su ordenador. [Link de descarga](http://imagemagick.org/script/download.php)

Esto seria todo respecto a la instalacion del mismo y poder empezar a trabajar.

### Comandos.

Este script que se encarga de optimizar nuestras imagenes. este comando deberiamos ejecutarlo una vez que tengamos nuestras imagenes en la carpeta <code>src/img</code>
```command
npm run build:media
```

Script que se encarga de escuchas de los cambios en los archivos en desarrollo. al igual que iniciarnos un servidor con Browser-Sync
```command
npm run watch:dev
```

Este script nos prepara nuestros archivos para producción.
```command
npm run build:prod
```

El script start de NPM nos prepara los archivos para producción y luegos nos lanza un servidor local
```command
npm start
```