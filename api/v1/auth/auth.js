var expressJwt 	= require('express-jwt'),
	jwt   		= require('jsonwebtoken'),
	userModel	= require('../user/user-model.js'),
	checkToken	= expressJwt({secret : "jsonweb"});

	exports.decodeToken = (req, res, next) => {
		checkToken(req, res, next);
		console.log(req.user);
	}

	exports.verifyUser = (req, res, next) => {
		var username = req.body.username,
			password = req.body.password;

		if(!username || !password) {
			return next(new Error("please enter username/password"));
		}

		userModel.findOne({username : username}).then(function(user){
			if(!user){ return next(new Error("username/password incorrect"))
		}
		
			if(!user.authenticate(password)){
				return next(new Error("incorrect username/password"));
			}

			req.user = user;
			next();

		}, (err) => { next(err);
		})
	}

	exports.signToken = (id) => {
		return jwt.sign(
			   {_id: id}, //the _id is a placeholder
			   "jsonweb",
			   {expiresIn: 24 * 60 * 60 * 7}
		);
	}


