# Ready2help
Ready2help es un kickstarter social...

<img src="https://ready2help.s3.eu-west-3.amazonaws.com/Original.png" width="300" />

Una plataforma diseñada para ayudar:
* A las pequeñas organizaciones a difundir, encontrar financiación y/o voluntarios para sus proyectos.
* A las personas que deseen realizar donaciones a proyectos concretos y/o participar como voluntario.


### Historia de Usuario V1

##### Como visitante puedo:
* ver los proyectos sociales
* registrarme como usuario con email y contraseña
* registrarme como organización con email y contraseña

##### Como usuario puedo:
* ver los proyectos sociales
* realizar donaciones o participar como voluntario en un proyecto después de completar los datos de perfil
* tener acceso al menú principal para editar/completar los datos de perfil y revisar las actividades(donaciones realizadas y/o participaciones como voluntario)

##### Como usuario organización puedo:
* ver los proyectos sociales
* crear, editar, eliminar proyectos
* tener acceso al menú principal para:
    - editar/completar los datos de perfil/organización
    - editar proyectos
    - revisar las actividades en la plataforma

### Tecnologías utilizadas
+ **Backend:** Flask-Python
+ **Frontend:** React.js, Bootstrap, HTML5, CSS3, SASS
+ **Base de datos:** SQLAlquemy/PostgreSQL

### Integraciones en ready2help
+ Envío de notificaciones al correo electrónico al realizar una donación: [SMTP](https://www.tutorialspoint.com/python/python_sending_email.htm)
+ Imágenes asociadas a los proyectos: [Amazon S3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html)
+ Pasarela de pago para las donaciones: [stripe (Payment Intents API)](https://stripe.com/docs/payments/payment-intents)
+ Notificaciones customizadas: [React-Toastify](https://fkhadra.github.io/react-toastify/installation/)
+ Web desplegada en  Heroku: [Ready2help](https://ready2help.herokuapp.com/)



# WebApp boilerplate with React JS
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/react-flask-hello.git)

<p align="center">
<a href="https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b"><img src="https://github.com/4GeeksAcademy/flask-rest-hello/blob/main/docs/assets/how-to.png?raw=true?raw=true" /></a>
</p>

### Styles
You can update the `styles/index.scss` or create new `.scss` files inside `styles/` and import them into your current scss or js files depending on your needs.

### Components
Add more files into your `./src/js/components` or styles folder as you need them and import them into your current files as needed.

💡Note: There is an example using the Context API inside `views/demo.js`;

### Views (Components)
Add more files into your `./src/js/views` and import them in `./src/js/layout.jsx`.

### Context
This boilerplate comes with a centralized general Context API. The file `./src/js/store/flux.js` has a base structure for the store, we encourage you to change it and adapt it to your needs.

React Context [docs](https://reactjs.org/docs/context.html)
BreathCode Lesson [view](https://content.breatheco.de/lesson/react-hooks-explained)

The `Provider` is already set. You can consume from any component using the useContext hook to get the `store` and `actions` from the Context. Check `/views/demo.js` to see a demo.

```jsx
import { Context } from "../store/appContext";
const MyComponentSuper = () => {
  //here you use useContext to get store and actions
  const { store, actions } = useContext(Context);
  return <div>{/* you can use your actions or store inside the html */}</div>
}
```

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine	| DATABASE_URL 						|
| ------------- | ----------------------------------------------------- |
| SQLite	| sqlite:////test.db	 				|
| MySQL		| mysql://username:password@localhost:port/example	|
| Postgress	| postgres://username:password@localhost:5432/example 	|

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start


### Front-End Manual Installation:

- Make sure you are using node version 14+ and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

## Publish your website!

This boilerplate it's 100% integrate with Herkou, just by pushing your changes to the heroku repository it will deploy: `$ git push heroku main`

## Recomendaciones para la instalación

Para trabajar con JWT el .encode no funciona con versiones superiores a pyjwt = "==1.7.1"