var app 	= require('./server.js'),
	request = require('supertest'),
	chai 	= require('chai'),
	assert  = chai.assert,
	expect	= chai.expect,
	should  = chai.should();


	describe("Student Endpoints", function() {
			it.skip("should fetch all the students", function(next) {
				request(app)
					   .get("/api/v1/students")
					   .expect(200)
					   .expect("Content-Type", "Application/json")
					   .end(function(err, res) {
					   		expect(res.body).to.be.an("array")
					   		assert.isArray(res.body);
					   		res.body.should.be.json;

					   		next();
					   })
			})
	}); 

	describe("Student Endpoints", function() {
			it("should add a student", function(next) {

				var data = {
					'name' : "Michael",
					'role' : "King"
				}

				request(app)
						.post("/api/v1/students")
						.send(data)
						.set("Content-Type", "Application/json")
						.expect(200)
						.end(function(err, res) {
							expect(res.body).to.be.an("object");
							expect(res.body.name).to.be.equal("Michael");
							//console.log(res.body);
							//res.body.should.be.json;


							next();
						})

			})

			it("should delete a student", function(next) {

				var data ={
					'name' : "Tina",
					'role' : "big head"
				}

				request(app)
						.post("/api/v1/students")
						.send(data)
						.set("Content-Type", "Application/json")
						.expect(200)
						.end(function(err, res){
							var id = res.body._id
							//console.log(res.body);

							request(app)
							.delete("/api/v1/students"+id)
							.set("Content-Type", "Application/json")
							.expect(200)
							.end(function(err, res){																
							expect(res.body).to.be.empty;

							next();

							})
						})
			})


	})

	describe("Student Endpoints", function(){
		it("should update student", function(next){
			var data = {
				"name" : "Michael",
				"role" : "King"
			}
			request(app)
			.post("/api/v1/students")
			.send(data)
			.set("Content-Type", "Application/json")
			.end(function(err,res){
				expect(res.body.name).to.be.equal("Michael");
				var id = res.body._id;
				var details = {
					"name" : "Tina",
					"role" : "biggi"
				}
				request(app)			
				.put("/api/v1/students"+id)
				.get("/api/v1/students"+id)
				console.log(res.body)
				.set("Content-Type", "Application/json")
				.expect(200)
				.end(function(err, res){
					expect(res.body.name).to.be.equal("Tina");
				})
			})
		})



	})



