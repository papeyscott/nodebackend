var request	= require("supertest"),
	chai		= require('chai'),
	assert		= chai.assert,
	expect		= chai.expect,
	app			= require("./server.js"),
	should		= chai.should();


	describe("students", function() {
		it.skip("tests that all students are returned", function(next) {
			request(app)
			.get("/api/v1/students")

			.end(function(err, result) {
					expect(result.body).to.be.an("array");
					next();
				})
		})

		it.skip("adds one student", function(next) {
			var data = {
				"name" : "damilare",
				"role" : "student"
			}
			request(app)
			.post("/api/v1/students")
			.send(data)
			.set("Content-Type", "Application/json")
			.end((err, res) => {
				expect(res.body).to.be.an("object");
				expect(res.body.name).to.be.equal("damilare")

				next();
			})
		})
	})