var auth 	= require('../auth/auth.js'),

	userModel = require('./user-model.js');


	exports.registerUser = (req, res, next) => {

		var user = req.body;


		var userObj = new userModel(user);
		userObj.save((err, data) => {
			if(err){ return next(err);}

			data = data.toObject();

			var token = auth.signToken(data._id);
			data["_token"] = token;
			res.status(200).json(data);
		});
	}