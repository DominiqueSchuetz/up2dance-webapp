import { ApiServer } from "./routes/index";
import { isMaster, fork, on } from "cluster";
import * as config from "../config";

const apiServer = new ApiServer();

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
	let workers = [];
	// to read number of cores on system
	let numCores = require("os").cpus().length;
	console.log("Master cluster setting up " + numCores + " workers");

	// iterate on number of cores need to be utilized by an application
	// current example will utilize all of them
	for (let i = 0; i < numCores; i++) {
		// creating workers and pushing reference in an array
		// these references can be used to receive messages from workers
		workers.push(fork());

		// to receive messages from worker process
		workers[i].on("message", function(message) {
			console.log(message);
		});
	}

	// process is clustered on a core and process id is assigned
	on("online", function(worker) {
		console.log("Worker " + worker.process.pid + " is listening");
	});

	// if any of the worker process dies then start a new one by simply forking another one
	on("exit", function(worker, code, signal) {
		console.log("Worker " + worker.process.pid + " died with code: " + code + ", and signal: " + signal);
		console.log("Starting a new worker");
		fork();
		workers.push(fork());
		// to receive messages from worker process
		workers[workers.length - 1].on("message", function(message) {
			console.log(message);
		});
	});
};

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */
const setupServer = (isClusterRequired) => {
	// if it is a master process then call setting up worker process
	if (isClusterRequired && isMaster) {
		setupWorkerProcesses();
	} else {
		// to setup server configurations and share port address for incoming requests
		apiServer.start(config.default.httpPort);
	}
};

setupServer(config.default.multithreading);
