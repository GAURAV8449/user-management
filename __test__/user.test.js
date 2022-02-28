var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000/api/user");

// UNIT test begin

describe("SAMPLE unit test",function(){

  it("should create user",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"Gaurav1",
      lastname:"Prakash",
      email:"gaurav11a111@gmail.com",
      password:"1111111"
    })
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
     
      // res.body.success.should.equal(true);
      done();
    });
  });

  it("user already exists",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"Gaurav1",
      lastname:"Prakash",
      email:"gaurav11a111@gmail.com",
      password:"1111111"
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      done();
    });
  });

  it("password is not allowed to be empty ",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"Gaurav1",
      lastname:"Prakash",
      email:"gaurav11a111@gmail.com",
      password:""
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      done();
    });
  });

  it("email must be a valid email ",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"Gaurav1",
      lastname:"Prakash",
      email:"abc",
      password:"123456"
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      done();
    });
  });


  it("lastname is not allowed to be empty",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"Gaurav1",
      lastname:"",
      email:"abc@gmail.com",
      password:"123456"
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      done();
    });
  });

  it("firstname is not allowed to be empty",function(done){
    //calling ADD api
    server
    .post('/')
    .send({
      firstname:"",
      lastname:"Prakash",
      email:"abc@gmail.com",
      password:"123456"
    })
    .expect("Content-type",/json/)
    .expect(400)
    .end(function(err,res){
      done();
    });
  });



it('should update the user data', function(done) {
    server
        .get('/')
        .end(function(err, res) {
          server
                .put('/' + res.body.data[0]._id)

                .send({
                  firstname:"Gaurav1",
                  lastname:"Prakash",
                  email:"abc",
                  password:"123456"
                })
                .expect(200)
                .end(function(error, response) {
                    done();
                });
        });
});



it('should delete a user', function(done) {
  server
      .get('/')
      .end(function(err, res) {
          server
              .delete('/' + res.body.data[0]._id)
              .expect(200)
              .end(function(error, response) {
                  done();
              });
      });
});


});
