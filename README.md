# Full-Stack Webapp

### Prerequisites

- node >= 10.15.0
- npm >= 6.5.0
- typescript >= 3.5.1
- ts-node >= 8.2.0
- nodemon >= 1.18.4
- docker >= 19.03.12

- Typescript (Superset of JavaScript)
- Mongoose (Middleware for handling mongoDB objects)
- Restify (Framework for rest calls)

## Getting Started

### From Github

```
$ git clone git@github.com:DominiqueSchuetz/up2dance-webapp.git
```

### Run Database

```
$: docker run -p 27017:27017 --name mongodb bitnami/mongodb:latest
```

### Run Server

#### Start the server (in differnet modes)

```
 $: npm i
```

```
 $: npm start
```

or

```
 $: NODE_ENV=development npm start
```

or

```
 $: NODE_ENV=production npm start
```

#### Routes

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

- Customer
- Event
- Media
- News
- User

### SSL

For Generationg the SSL cert and key use:

```
$: openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

## Deployment

```
 $: npm build
```

### Run Frontend

```
 $: npm i
```

```
 $: npm start
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Author

- **Dominique Schuetz (M.Eng)** - [GitHub](https://github.com/DominiqueSchuetz)
- **LinkedIn** [Profile](https://www.linkedin.com/in/dominique-schütz-690349a9/)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
