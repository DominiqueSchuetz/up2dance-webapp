# REST-Api

This REST-Api is developed with basicly three code bases.

* Typescript (Superset of JavaScript)
* Mongoose (Middleware for handling mongoDB objects)
* Restify (Framework for rest calls)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* node >= 10.15.0
* npm >= 6.5.0
* typescript >= 3.5.1
* ts-node >= 8.2.0
* nodemon >= 1.18.4

### Installing

```
$: npm i
```
### Run MongoDB with Docker

```
$: docker run --name mongodb bitnami/mongodb:latest
```
check => localhost:27017 for mongoDB connection

## Start the server (in differnet modes)
```
 $: npm start
```
```
 $: NODE_ENV=development npm start
```
``` 
 $: NODE_ENV=production npm start
```

### Routes

Here are the routes, which are linked to a specific Model
```
* GET/PUT/DEL: /api/customer/:id
* GET: /api/customer/all
```

```
* GET/PUT/DEL: /api/user/:id
* GET: /api/user/all
```

```
* GET/PUT/DEL: /api/event/:id
* GET: /api/event/all
```

```
* GET/PUT/DEL: /api/news/:id
* GET: /api/news/all
```

```
* GET/PUT/DEL: /api/media/:id
* GET: /api/media/all
```

### Models

* Customer
* Event
* Media
* News
* User


### SSL

For Generationg the SSL cert and key use:
```
$: openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

## Deployment

``` 
 $: npm build
```

## Author

* **Dominique Schuetz (M.Eng)** - [GitHub](https://github.com/DominiqueSchuetz)
* **LinkedIn** [Profile](https://www.linkedin.com/in/dominique-schütz-690349a9/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
