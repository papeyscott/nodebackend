var app = require("./server/server.js"),
	express = require("express");


	app.use(express.static(__dirname + "/www"));

// listen for incoming requests
	app.listen(3000, () => {
		console.log("server started...");
	});
