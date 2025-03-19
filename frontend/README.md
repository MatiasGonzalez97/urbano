# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### _Pasos base solicitados_

[X]Despegar app con docker
[x] conectar backend y frontend
[X] Camiar titulo
[x] Cambiar favicon
[x] modificar estilo con paleta de colores
[x] fuentes

### Opción A y B Optimizar alguna funcionalidad.

[x] Manejo de información. En las páginas se utiliza una librería “react-
query” que está generando peticiones a la API cada 1 segundo para

refrescar la información que se muestra al usuario. Podrías cambiar este
comportamiento colocando un botón para refrescar y/o solicitar la
información a la API a medida que el usuario interactúa con los filtros de
la tabla (relacionado al siguiente punto). [Se agrego un boton para "cargar" los resultados]
[X] Métodos de filtrado, ordenamiento y paginación. Los listados de cursos,
contenidos y usuarios se presentan sin muchas opciones, es decir, se
solicitan todos los registros para cada entidad y se permite filtrar por
nombre o descripción desde el frontend. Sería una buena opción ofrecer
al usuario la posibilidad de filtrar, ordenar y paginar los resultados.

### Nueva funcionalidad, Formulario de contacto con envio de email

[x] Sección Contacto. Formulario que dispare envío de email a una casilla
configurable.

### Mejoras extras

[X] La tabla se actualiza sin necesidad de refrescar la pagina al actualizar o eliminar un curso
[X] La tabla se actualiza sin necesidad de refrescar la pagina al actualizar o eliminar un usuario
