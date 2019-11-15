import routes from "./routes";
const express = require('express');
import { createConnection } from 'typeorm';
import router from "./routes";
import * as cors from 'cors';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = 3000;

// Connects to the messageDataDatabase -> then starts the express
createConnection()
	.then(async connection => {
		// Create a new express application instance
		const app = express();
		
		// simple middle ware to handle cross-origin requests
		app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "http://localhost:4200");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Authorization, Content-Type, Accept");
			res.header("Access-Control-Allow-credentials", true);
			res.header("Access-Control-Allow-Methods", "PATCH, OPTIONS, GET, PUT, POST, DELETE, HEAD");
			next();
		});
		
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
		app.use(cookieParser());
		app.use('/', router);
		
		const server = app.listen(PORT, () => {
			console.log(`Worker ${process.pid} started on port ${PORT}!`);
		});
		server.keepAliveTimeout = 125000;
		
	})
	.catch(error => console.log(error));
