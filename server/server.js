var express 	= require("express"),
	bps			= require("body-parser"),  //body parser, to process request data
	app			= express(),
	api 		= require("../api/api.js"),
	cors		= require("cors"),
	morgan		= require("morgan");


	app.use(bps.json());
	app.use(bps.urlencoded({extended: true}));  

	app.use(morgan("dev"));

	// serve static files
	//app.use(express.static(__dirname + "/www"));

	// mount routes
	app.use("/api/v1", api);

	app.use(cors());

	// Your error handler must be the last endpoint in your list of routes
	// application error handler
	app.use((err, req, res, next) => {
		res.status(500).json(err.message);
		next();

	})


	module.exports = app;
	
	
	