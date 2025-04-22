
# React Refactor

Este proyecto es una refactorización de un proyecto previo con el objetivo de mejorar su estructura y hacerla más mantenible. Utiliza **React** con **PrimeReact** para la interfaz de usuario y **Vite** como bundler. El objetivo principal es ofrecer una solución eficiente y modular para gestionar objetos, como unicornios, en una aplicación web.

## Estructura del Proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
REACT_REFACTOR/
|-- public/                   # Archivos públicos
|-- src/                      # Código fuente de la aplicación
|   |-- context/              # Contextos globales
|   |-- layouts/              # Componentes de diseño
|   |   |-- home/             # Vista principal
|   |   |-- objects/          # Componentes para gestionar objetos
|   |   |   |-- unicorns/     # Submódulo específico para gestionar unicornios
|   |       |-- context/      # Contexto para Unicorns
|   |-- app.css               # Estilos globales
|   |-- app.jsx               # Componente principal de la aplicación
|   |-- index.css             # Estilos de index
|   |-- main.jsx              # Punto de entrada de la aplicación
|-- index.tyml                # Configuración del proyecto
|-- package-lock.json         # Dependencias exactas
|-- package.json              # Dependencias y scripts
|-- README.md                 # Documentación del proyecto
|-- vite.config.js            # Configuración de Vite
```

## Descripción

Este proyecto permite gestionar un conjunto de objetos, en este caso, **unicornios**, a través de una interfaz sencilla y atractiva. Los unicornios pueden ser creados, actualizados y eliminados utilizando **CRUD** con una API RESTful. La estructura de la aplicación está diseñada para ser modular y escalable, utilizando principios como la separación de responsabilidades y el contexto global para compartir datos.

### Características

- **Gestión de unicornios**: Crear, leer, actualizar y eliminar unicornios.
- **Validación de formularios**: Los campos son validados antes de enviarlos al servidor.
- **Interfaz responsiva**: Utiliza componentes de **PrimeReact** para asegurar una interfaz de usuario moderna y adaptativa.
- **Estado global**: Utiliza contextos para manejar el estado global de los datos.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

### Clonar el repositorio

```bash
git clone https://github.com/Cdruetta/react_refactor.git
cd react_refactor
```

### Instalar dependencias

```bash
npm install
```

### Ejecutar la aplicación

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador:

```bash
npm run dev
```

La aplicación debería estar disponible en [http://localhost:3000](http://localhost:3000).

## Uso

Una vez que la aplicación esté en funcionamiento, puedes interactuar con la interfaz para realizar las siguientes acciones:

- **Crear un unicornio**: Ingresa los datos del unicornio (nombre, color, edad y poder) y presiona "Crear Unicornio".
- **Actualizar un unicornio**: Selecciona un unicornio de la lista y actualiza sus datos.
- **Eliminar un unicornio**: Selecciona un unicornio de la lista y presiona "Eliminar".

## Tecnologías utilizadas

- **React**: Librería de JavaScript para construir interfaces de usuario.
- **PrimeReact**: Biblioteca de componentes UI para React.
- **Vite**: Bundler rápido para proyectos en JavaScript/TypeScript.
- **Framer Motion**: Librería para animaciones en React.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios.
4. Haz commit de tus cambios (`git commit -am 'Agregada nueva funcionalidad'`).
5. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
6. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
