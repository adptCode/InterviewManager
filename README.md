# Prueba Técnica en Angular

## Introducción

Esta aplicación fue desarrollada como respuesta a una prueba técnica que requiere el uso de **Angular 16** para gestionar formularios reutilizables destinados a entrevistas. Aunque mi enfoque habitual es trabajar con soluciones modernas, como los **componentes standalone** introducidos en Angular 16, he optado por utilizar la configuración tradicional basada en módulos para asegurar la máxima compatibilidad con entornos que podrían no estar completamente adaptados a las nuevas funcionalidades.

El proyecto sigue las mejores prácticas en cuanto a:
- Arquitectura de componentes y servicios para un código limpio y mantenible.
- Validaciones de formularios con mensajes específicos para errores comunes.
- Persistencia de datos en `localStorage` para garantizar la continuidad entre sesiones.
- Uso de **Bootstrap** para un diseño simple pero funcional.

El objetivo fue desarrollar una solución completa, funcional e intuitiva, cumpliendo con todos los requisitos indicados en la prueba técnica.

## Tecnologías Utilizadas

- **Framework**: Angular 16.
- **Estilos**: Bootstrap.
- **Persistencia de Datos**: `localStorage`.

## Instrucciones para Ejecutar el Proyecto

1. **Descomprimir el archivo zip**  
   Descargue y descomprima el archivo zip del proyecto en su máquina local.

2. **Abrir una terminal en la carpeta del proyecto**  
   Navegue hasta la carpeta del proyecto descomprimido utilizando la terminal.

3. **Instalar dependencias**  
   Ejecute el siguiente comando para instalar las dependencias necesarias:

   ```bash
   npm install
   ```

4. **Ejecutar en modo desarrollo**
   Use el comando siguiente para iniciar el servidor de desarrollo:

   ```bash
   npm start
   ```
   Esto iniciará un servidor en [http://localhost:4200](http://localhost:4200).

5. **Construir para producción**
   Para generar la versión optimizada del proyecto:

   ```bash
   npm run build
   ```
   Los archivos construidos estarán en la carpeta dist/.

