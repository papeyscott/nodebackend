var studentModel = require("./student-model.js");


exports.interceptIDs = (req, res, next, id) => {
		studentModel.findById(id).then((data) => {
			if(!data) {return next(new Error("...")); }
			req.student = data;
			next();
		}, (err) => {return next(err); })
	}


exports.fetchAllStudents = (req, res, next) => {

	studentModel.find((err, data) => {
			if(err) { return next(new Error("failed to get students")); }

			res.status(200).json(data);
		});
}

exports.addStudent = (req, res, next) => {
		var student = req.body;

		var pupil = new studentModel(student);
		pupil.save((err, data) => {
			if(err) { return next(new Error("failed to add student")); }

			res.status(200).json(data);
		})
	}

exports.getStudent = (req, res, next) => { 

			if(!req.student) { return next(new Error("failed to get student")); }

			res.status(200).json(req.student);
		
}


exports.RemoveStudent = (req, res, next) => {
				var id = req.params.id;

				studentModel.findByIdAndRemove(id).then((data) => {
					if(!data){ return next(new Error("failed to delete student"));}

					res.status(200).json(data);
				}, (err) => { return next(err);
				});
} 

exports.EditStudent = (req, res, next) => {
				var id = req.params.id;

				studentModel.findByIdAndUpdate(id, req.body).then((data) => {
					if(!data){ return next( new Error("can't find data"));}
					res.status(200).json(data);
				}, (err) => { return next(err);
				});
}

