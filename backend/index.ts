import routes from "./routes";
const express = require('express')
import { createConnection } from 'typeorm';
import router from "./routes";
import * as cors from 'cors';
const bodyParser = require('body-parser')
const PORT = 3000;

// Connects to the messageDataDatabase -> then starts the express
createConnection()
	.then(async connection => {
		// Create a new express application instance
		const app = express();
		// Set all routes from routes folder
		app.use(cors());
		app.use(bodyParser.urlencoded({ extended: false }))
		app.use(bodyParser.json())
		app.use('/', router);
		
		const server = app.listen(PORT, () => {
			console.log(`Worker ${process.pid} started on port ${PORT}!`);
		});
		server.keepAliveTimeout = 125000;
		
	})
	.catch(error => console.log(error));
