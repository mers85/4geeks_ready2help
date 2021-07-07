# Ready2help
<img src="https://ready2help.s3.eu-west-3.amazonaws.com/Original.png" width="450" height="450"  align="center" />

Es un kickstarter social...

Una plataforma diseñada para ayudar:
* A las pequeñas organizaciones a difundir, encontrar financiación y/o voluntarios para sus proyectos.
* A las personas que deseen realizar donaciones a proyectos concretos y/o participar como voluntario.

### Tecnologías utilizadas
+ **Back-end:** Flask-Python
+ **Front-end:** React.js, Bootstrap, HTML5, CSS3, SASS
+ **Base de datos:** SQLAlquemy/PostgreSQL

### Integraciones en ready2help
+ Envío de notificaciones al correo electrónico al realizar una donación: [SMTP](https://www.tutorialspoint.com/python/python_sending_email.htm)
+ Imágenes asociadas a los proyectos: [Amazon S3](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-uploading-files.html)
+ Pasarela de pago para las donaciones: [stripe (Payment Intents API)](https://stripe.com/docs/payments/payment-intents)
+ Notificaciones customizadas: [React-Toastify](https://fkhadra.github.io/react-toastify/installation/)
+ Web desplegada en  Heroku: [Ready2help](https://ready2help.herokuapp.com/)

### Variables Globales del proyecto
* **Back-end Variables:**
    - DATABASE_URL=postgresql://gitpod@localhost:5432/example
    - FLASK_APP_KEY="your-app-key"
    - FLASK_APP=src/app.py
    - FLASK_ENV=development

* **Front-end Variables:**
    - BASENAME=/
    - PASS_EMAIL="contraseña-del-email-a-utilizar-para-envios-de-correo"
    - FRONTEND_URL="local url"
    - BACKEND_URL="local url"

* **Stripe keys:**
    - REACT_APP_STRIPE_PUBLIC_KEY="your-stripe-public-key"
    - STRIPE_SECRET_KEY="your-stripe-secret-key"
    - STRIPE_API_VERSION="2020-08-27"

* **Amazon keys:**
    - S3_ID="your-id-aws"
    - S3_SECRET="your-secret-key-aws"
    - S3_BUCKET_NAME="your-bucket-name-aws"

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

### Diagrama Base de Datos
<img src="https://ready2help.s3.eu-west-3.amazonaws.com/QuickDBD-Ready2help_diagram.png" width="450" height="450"/>

### Wireframe
[Creado en digrams.net](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1y8E6a6jTmrCkxzuG6xiizyCf8OOSyMbD%26export%3Ddownload)